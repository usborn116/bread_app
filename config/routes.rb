Rails.application.routes.draw do
  root to: 'homepage#index'
  get 'user', to: 'homepage#user'
  resources :budgets
  resources :categories do
    collection do
      get 'fund_categories'
      get 'budget_categories'
    end
  end
  post 'create_link_token', to: 'plaid_credentials#create_link_token'
  post 'create_link_token_update/:access_token', to: 'plaid_credentials#create_link_token_update'
  post 'exchange_public_token/:public_token', to: 'plaid_credentials#exchange_public_token'
  get 'sync_transactions', to: 'plaid_credentials#sync_transactions'
  get 'get_balances', to: 'plaid_credentials#get_balances'
  resources :accounts
  resources :transactions
  resources :plaid_credentials
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "plaid_credentials/index"
  get '/*path' => 'homepage#index'
  
end
