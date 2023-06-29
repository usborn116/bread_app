class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :account_id
      t.float :available
      t.float :current
      t.float :limit
      t.string :last_four
      t.string :name
      t.string :official_name
      t.string :type
      t.string :subtype
      t.references :user, null: false, foreign_key: true


      t.timestamps
    end
  end
end
