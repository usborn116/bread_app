class Budget < ApplicationRecord
    belongs_to :user
    has_many :transactions
    has_many :categories

    def update_categories
        categories = Category.where(category_type:'monthly').map(&:name).uniq
        self.update(start_date: Date.new(self.year.to_i, Date::MONTHNAMES.index(self.month), 1),
                     end_date: Date.new(self.year.to_i, Date::MONTHNAMES.index(self.month), -1))
        categories.map do |c| 
          b = Category.where(category_type: 'monthly').order("created_at DESC").find_by(name: c)
          b = b.dup
          b.update(budget_id: self.id, budget_month: self.month)
        end
        self.update(budget_amount: self.categories.map(&:budget_amt).sum, balance: self.categories.map(&:current).sum)
        self.update(rollover: self.balance)
    end
end
