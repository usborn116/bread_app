class Category < ApplicationRecord
  belongs_to :user
  belongs_to :account, optional: true
  has_many :transactions
  belongs_to :budget, optional: true

  def name_with_month
    result = self.as_json
    result['month_name'] = "#{self.name} - #{self.budget_month}"
    result
  end
  
end
