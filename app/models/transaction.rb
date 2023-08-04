class Transaction < ApplicationRecord
    validates :transaction_id, presence: true, uniqueness: true
    belongs_to :user
    belongs_to :category, optional: true
    belongs_to :account, optional: true
    belongs_to :budget, optional: true

    def bank_account_name
        a = Account.find_by(account_id: self.account_id) || self.account
        r = self.as_json
        r['bank'] = a ? a.name : nil
        r
    end
end
