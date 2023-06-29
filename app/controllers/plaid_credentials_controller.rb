class PlaidCredentialsController < ApplicationController
    require 'plaid'
    require 'dotenv'

    def index
        @user_id = current_user.id
    end

    def update
        find_credential.update!(plaid_credential_params)
    end

    def create_config
        configuration = Plaid::Configuration.new
        configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV']]
        configuration.api_key['PLAID-CLIENT-ID'] =  ENV['PLAID_CLIENT_ID']
        configuration.api_key['PLAID-SECRET'] = ENV['PLAID_SECRET']
        api_client = Plaid::ApiClient.new(configuration)
        client = Plaid::PlaidApi.new(api_client)
        client
    end

    def create_link_token
        @credential = find_credential
        client = create_config

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
        response = client.link_token_create(request)
        @credential.update!(:link_token => response.link_token.to_json)
        print @credential
        render json: response
    end

    def exchange_public_token
        @credential = find_credential
        client = create_config

        request = Plaid::ItemPublicTokenExchangeRequest.new({public_token: params[:public_token]})
        response = client.item_public_token_exchange(request)
        @credential.update!(access_token: response.access_token)
        @credential.update!(item_id: response.item_id)
        @access_token
    end

    def sync_transactions
        @credential = find_credential
        print "ID: #{@credential.id}, Access: #{@credential.access_token}"
        
        #begin
            client = create_config
            # Set cursor to empty to receive all historical updates
            cursor = @credential.cursor
        
            # New transaction updates since "cursor"
            added = []
            modified = []
            removed = [] # Removed transaction ids
            has_more = true
            # Iterate through each page of new transaction updates for item
            request = Plaid::TransactionsSyncRequest.new(
                {
                access_token: @credential.access_token,
                cursor: cursor
                }
            )
            response = client.transactions_sync(request)
            # Add this page of results
            added += response.added
            modified += response.modified
            removed += response.removed
            has_more = response.has_more
            # Update cursor to the next cursor
            puts response.next_cursor
            puts response.has_more
            @credential.cursor = response.next_cursor

            # Return the 8 most recent transactions
            added.each do |t| 
                txn = Transaction.find_or_create_by(transaction_id: t.transaction_id)
                txn.update!(
                    account_id: t.account_id,
                    amount: t.amount,
                    category_id: t.category_id,
                    date: t.date,
                    category: t.category.join(','),
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
            print added.sort_by(&:date).last(8).map(&:to_hash).first.to_json
            render json: added.sort_by(&:date).last(8).map(&:to_hash)
            #return added.sort_by(&:date).last(8).map(&:to_hash)

        #rescue Plaid::ApiError => e
        #    print e
        #    e.to_json
        #end
    end

    private

    def find_credential
        PlaidCredential.find_or_create_by(user_id: current_user.id)
    end

    def plaid_credential_params
        require(:plaid_credential).permit(:link_token, :access_token, :item_id, :cursor)
    end




end
