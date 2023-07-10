class CreateBudgets < ActiveRecord::Migration[7.0]
  def change
    create_table :budgets do |t|
      t.date :month
      t.float :balance
      t.float :budget_amount
      t.date :start_date
      t.date :end_date
      t.float :rollover

      t.timestamps
    end
  end
end
