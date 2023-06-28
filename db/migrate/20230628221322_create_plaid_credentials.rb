class CreatePlaidCredentials < ActiveRecord::Migration[7.0]
  def change
    create_table :plaid_credentials do |t|
      t.string :link_token
      t.string :access_token
      t.string :item_id
      t.string :cursor
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
