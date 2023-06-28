Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "plaid_credentials#index"
  # Defines the root path route ("/")
  # root "articles#index"
  post 'create_link_token', to: 'plaid_credentials#create_link_token'
  post 'exchange_public_token/:public_token', to: 'plaid_credentials#exchange_public_token'
  get 'transactions', to: 'plaid_credentials#transactions'
end
