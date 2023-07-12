class AddBudgetMonthBack < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :budget_month, :string
  end
end
