json.extract! budget, :id, :month, :balance, :budget_amount, :start_date, :end_date, :rollover, :created_at, :updated_at
json.url budget_url(budget, format: :json)
