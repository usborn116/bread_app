Rails.application.routes.draw do
  post 'create_link_token', to: 'plaid_credentials#create_link_token'
  post 'exchange_public_token/:public_token', to: 'plaid_credentials#exchange_public_token'
  get 'sync_transactions', to: 'plaid_credentials#sync_transactions'
  get 'get_balances', to: 'plaid_credentials#get_balances'
  resources :accounts
  resources :transactions
  resources :plaid_credentials
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "plaid_credentials#index"
  # Defines the root path route ("/")
  # root "articles#index"
  
end
