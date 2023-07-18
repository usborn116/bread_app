class Account < ApplicationRecord
    belongs_to :user
    has_many :transactions
    belongs_to :plaid_credential, optional: true
    has_many :categories
end
