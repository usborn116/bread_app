class AddNoticeToCredentials < ActiveRecord::Migration[7.0]
  def change
    add_column :plaid_credentials, :notice, :string
  end
end
