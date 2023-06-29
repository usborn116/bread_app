class Transaction < ApplicationRecord
    validates :transaction_id, presence: true, uniqueness: true
    belongs_to :user
    belongs_to :account
end
