class Budget < ApplicationRecord
    has_many :transactions
    has_many :categories
end
