class Category < ApplicationRecord
  belongs_to :user
  belongs_to :account, optional: true
  has_many :transactions
  belongs_to :budget, optional: true

  def name_with_month
    "#{self.name} - #{self.budget_month}"
  end
  
end
