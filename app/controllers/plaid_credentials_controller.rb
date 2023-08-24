class PlaidCredentialsController < ApplicationController
    before_action :find_credential, except: %i[create_link_token_update create_link_token exchange_public_token sync_transactions get_balances index]
    before_action :create_config, only: %i[ create_link_token create_link_token_update exchange_public_token sync_transactions get_balances get_institution_id get_institution_name ]
    require 'plaid'
    require 'dotenv/load'

    def index
        @credentials = PlaidCredential.where(user_id: current_user.id)
        render json: @credentials
    end

    def show
        @txns = Transaction.where(institution_name: @credential.institution_name).sort_by{|t| [t.date, t.updated_at]}.reverse
        @accts = Account.where(institution_name: @credential.institution_name)
        render json: {credential: @credential, transactions: @txns, accounts: @accts}
    end

    def update
        find_credential.update!(plaid_credential_params)
    end

    def create_link_token
        params[:access_token] ? product = [] : products = ['transactions']
        request = Plaid::LinkTokenCreateRequest.new(
            {
            user: { client_user_id: current_user.id.to_s },
            client_name: 'Usborn test app',
            products: products,
            country_codes: ['US'],
            language: "en",
            redirect_uri: 'http://localhost:3000/',
            webhook: 'https://webhook.example.com'
            }
        )
        response = @client.link_token_create(request)
        render json: response
    end

    def create_link_token_update
        request = Plaid::LinkTokenCreateRequest.new(
            {
            user: { client_user_id: current_user.id.to_s },
            client_name: 'Usborn test app',
            access_token: params[:access_token],
            country_codes: ['US'],
            language: "en",
            redirect_uri: 'http://localhost:3000/',
            webhook: 'https://webhook.example.com'
            }
        )
        response = @client.link_token_create(request)
        render json: response
    end

    def exchange_public_token
        @credential = PlaidCredential.new(user_id: current_user.id)
        @credential.save
        request = Plaid::ItemPublicTokenExchangeRequest.new({public_token: params[:public_token]})
        response = @client.item_public_token_exchange(request)
        @credential.update!(access_token: response.access_token,item_id: response.item_id)
        get_institution_id
        get_institution_name
        create_cash_acct
        get_balances([@credential])
        sync_transactions([@credential])
        @access_token
    end

    def sync_transactions(credentials = PlaidCredential.where.not(access_token: nil))
        
        credentials.each do |c|
            added = []
            removed = []
        
            begin
                request = Plaid::TransactionsSyncRequest.new(
                    {access_token: c.access_token,
                    cursor: c.cursor,
                    options: {include_personal_finance_category: true},
                    count: 200
                    }
                )
                response = @client.transactions_sync(request)

                added += response.added
                added += response.modified
                removed += response.removed
                has_more = response.has_more
                c.update!(cursor: response.next_cursor)

                added.each do |t|
                    txn = Transaction.find_or_create_by(transaction_id: t.transaction_id)
                    txn.update!(
                        institution_name: c.institution_name,
                        account_id: t.account_id,
                        amount: t.amount,
                        date: t.date,
                        plaid_category: "#{t.personal_finance_category.primary}, #{t.personal_finance_category.detailed}",
                        name: t.name,
                        merchant: t.merchant_name,
                        description: t.original_description,
                        pending: t.pending,
                        transaction_id: t.transaction_id,
                        transaction_type: t.transaction_type,
                        authorized_date: t.authorized_date,
                        user_id: current_user.id
                    )
                end
    
                removed.each do |t| 
                    txn = Transaction.find_by(transaction_id: t.transaction_id)
                    txn.destroy
                end

                c.update(notice: "Last synced: #{Date.today}")
                
            rescue => exception
                p exception
                c.update(notice: "Failed to Sync")
            end
            
        end
    end

    def get_balances(credentials = PlaidCredential.all)

        credentials.each do |c|
            request = Plaid::AccountsBalanceGetRequest.new({ access_token: c.access_token })
            response = @client.accounts_balance_get(request)
            accounts = response.accounts

            accounts.each do |a| 
                acct = Account.find_or_create_by(account_id: a.account_id)
                acct.update!(
                    institution_name: c.institution_name,
                    account_id: a.account_id,
                    available: a.balances.available,
                    current: a.balances.current,
                    limit: a.balances.limit,
                    last_four: a.mask,
                    name: a.name,
                    official_name: a.official_name,
                    account_type: a.type,
                    subtype: a.subtype,
                    user_id: current_user.id
                )
            end
        end
        render json: Account.all.sort_by(&:name).last(8)
    end

    def destroy
        n = @credential.institution_name
        @credential.destroy
        Account.where(institution_name: n).each {|a| a.destroy}
        Transaction.where(institution_name: n).each {|t| t.destroy}
        render json: {message: 'Deleted!'}
    end

    private

    def find_credential
        @credential = PlaidCredential.find(params[:id])
    end

    def plaid_credential_params
        require(:plaid_credential).permit(:id, :link_token, :access_token, :item_id, :cursor, :institution_name, :institution_id)
    end

    def create_config
        configuration = Plaid::Configuration.new
        configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV']]
        configuration.api_key['PLAID-CLIENT-ID'] =  ENV['PLAID_CLIENT_ID']
        configuration.api_key['PLAID-SECRET'] = ENV['PLAID_SECRET']
        api_client = Plaid::ApiClient.new(configuration)
        @client = Plaid::PlaidApi.new(api_client)
    end

    def get_institution_id
        request = Plaid::ItemGetRequest.new({ access_token: @credential.access_token })
        response = @client.item_get(request)
        @credential.update!(institution_id: response.item.institution_id)
    end

    def get_institution_name
        request = Plaid::InstitutionsGetByIdRequest.new({institution_id: @credential.institution_id,country_codes: ["US"]})
        response = @client.institutions_get_by_id(request)
        @credential.update!(institution_name: response.institution.name)
    end

    def create_cash_acct
        return if Account.find_by(account_id: 'Cash')
        Account.create(account_id: 'Cash', last_four: 'CASH', 
                    name: 'Cash account', account_type: 'depository', 
                    subtype: 'cash', user_id: current_user.id)
        PlaidCredential.create(institution_name: 'Cash')
    end

end
