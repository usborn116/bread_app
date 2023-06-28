json.extract! transaction, :id, :account_id, :amount, :category_id, :date, :category, :name, :merchant, :description, :pending, :transaction_id, :transaction_type, :authorized_date, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
