class Transaction < ApplicationRecord
    validates :transaction_id, presence: true, uniqueness: true
    belongs_to :user
    belongs_to :group, class_name: "Category", optional: true
    belongs_to :account, optional: true
end
