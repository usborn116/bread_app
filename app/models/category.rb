class Category < ApplicationRecord
  belongs_to :user
  belongs_to :account, optional: true
  has_many :transactions
  belongs_to :budget, optional: true
end