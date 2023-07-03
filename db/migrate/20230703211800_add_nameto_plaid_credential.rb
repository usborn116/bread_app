class AddNametoPlaidCredential < ActiveRecord::Migration[7.0]
  def change
    add_column :plaid_credentials, :institution_name, :string
    add_column :plaid_credentials, :institution_id, :string
  end
end
