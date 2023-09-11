class Account < ApplicationRecord
    belongs_to :user
    has_many :transactions
    belongs_to :plaid_credential, optional: true
    has_many :categories

    def transactions
        if self.subtype != 'cash'
            print self
            Transaction.where(account_id: self.account_id)
            #super
        else
            Transaction.where(account_id: self.id.to_s)
        end
    end

    def update_after_txn(amt)
        self.update(available: self.available - amt)
    end
end
