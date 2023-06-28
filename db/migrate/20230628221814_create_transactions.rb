class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :account_id
      t.float :amount
      t.string :category_id
      t.date :date
      t.text :category
      t.string :name
      t.string :merchant
      t.string :description
      t.boolean :pending
      t.string :transaction_id
      t.string :transaction_type
      t.date :authorized_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
