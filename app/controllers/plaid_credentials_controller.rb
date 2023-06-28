class PlaidCredentialsController < ApplicationController
    require 'plaid'
    require 'dotenv'

    def index
        @user_id = current_user.id
    end

    def create_link_token
        @configuration = Plaid::Configuration.new
        @configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV']]
        @configuration.api_key['PLAID-CLIENT-ID'] =  ENV['PLAID_CLIENT_ID']
        @configuration.api_key['PLAID-SECRET'] = ENV['PLAID_SECRET']
        @api_client = Plaid::ApiClient.new(@configuration)
        @client = Plaid::PlaidApi.new(@api_client)

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
        print ("params: #{params}")
        @configuration = Plaid::Configuration.new
        @configuration.server_index = Plaid::Configuration::Environment[ENV['PLAID_ENV']]
        @configuration.api_key['PLAID-CLIENT-ID'] =  ENV['PLAID_CLIENT_ID']
        @configuration.api_key['PLAID-SECRET'] = ENV['PLAID_SECRET']
        @api_client = Plaid::ApiClient.new(@configuration)
        @client = Plaid::PlaidApi.new(@api_client)
        @access_token = nil

        request = Plaid::ItemPublicTokenExchangeRequest.new({public_token: params[:public_token]})
        response = @client.item_public_token_exchange(request)
        # These values should be saved to a persistent database and
        # associated with the currently signed-in user
        @access_token = response.access_token
        @item_id = response.item_id
        print @access_token
        {public_token_exchange: "complete"}.to_json
    end

    def transactions
        begin
            # Set cursor to empty to receive all historical updates
            @cursor = ''
        
            # New transaction updates since "cursor"
            added = []
            modified = []
            removed = [] # Removed transaction ids
            has_more = true
            # Iterate through each page of new transaction updates for item
            while has_more
                request = Plaid::TransactionsSyncRequest.new(
                    {
                    access_token: @access_token,
                    cursor: @cursor
                    }
                )
                response = client.transactions_sync(request)
                # Add this page of results
                added += response.added
                modified += response.modified
                removed += response.removed
                has_more = response.has_more
                # Update cursor to the next cursor
                cursor = response.next_cursor
            pretty_print_response(response.to_hash)
            end

            # Return the 8 most recent transactions
            content_type :json

            { latest_transactions: added.sort_by(&:date).last(8).map(&:to_hash) }.to_json

        rescue Plaid::ApiError => e
            error_response = format_error(e)
            pretty_print_response(error_response)
            content_type :json
            error_response.to_json
        end
    end




end
