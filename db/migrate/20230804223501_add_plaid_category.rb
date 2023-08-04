class AddPlaidCategory < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :plaid_category, :string
  end
end
