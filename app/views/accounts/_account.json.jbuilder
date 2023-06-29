json.extract! account, :id, :account_id, :available, :current, :limit, :last_four, :name, :official_name, :type, :subtype, :created_at, :updated_at
json.url account_url(account, format: :json)
