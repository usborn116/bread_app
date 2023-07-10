class AddColumnsToCategory < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :budget_type, :string
    add_column :categories, :status, :string
    add_column :categories, :budget_month, :date
  end
end
