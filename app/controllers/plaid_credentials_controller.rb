class PlaidCredentialsController < ApplicationController
    before_action :find_credential, except: %i[create_link_token exchange_public_token sync_transactions get_balances index]
    before_action :create_config, only: %i[ create_link_token exchange_public_token sync_transactions get_balances get_institution_id get_institution_name ]
    require 'plaid'
    require 'dotenv'

    def index
        @user_id = current_user.id
        @credentials = PlaidCredential.where(user_id: current_user.id)
    end

    def update
        find_credential.update!(plaid_credential_params)
    end

    def create_link_token
        request = Plaid::LinkTokenCreateRequest.new(
            {
            user: { client_user_id: current_user.id.to_s },
            client_name: 'Usborn test app',
            products: ['transactions'],
            country_codes: ['US'],
            language: "en",
            redirect_uri: nil,
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
        @credential.update!(access_token: response.access_token)
        @credential.update!(item_id: response.item_id)
        get_institution_id
        get_institution_name
        get_balances
        sync_transactions
        @access_token
    end

    def sync_transactions

        PlaidCredential.all.each do |c|
            added = []
            removed = []
            has_more = true
            
            while has_more
                request = Plaid::TransactionsSyncRequest.new(
                    {access_token: c.access_token,
                    cursor: c.cursor,
                    options: {include_personal_finance_category: true}
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
                        category_id: t.category_id,
                        date: t.date,
                        category: "#{t.personal_finance_category.primary}, #{t.personal_finance_category.detailed}",
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
            end
        end

    end

    def get_balances

        PlaidCredential.all.each do |c|
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

end
