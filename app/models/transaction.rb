class Transaction < ApplicationRecord
    validates :transaction_id, presence: true, uniqueness: true
    belongs_to :user
    belongs_to :group, class_name: "Category", optional: true
    belongs_to :account, optional: true
    belongs_to :budget, optional: true

    def update_accts_budget_category
        self.account.update_after_txn(self.amount) if self.transaction_id.match('cash')
        self.group.update_current
        Budget.all.each{|b| b.update_categories}
    end
end
