class ChangeBudgetColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :budgets, :month, :string
    add_column :budgets, :year, :string
  end
end
