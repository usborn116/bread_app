class AddReferencestoCategory < ActiveRecord::Migration[7.0]
  def change
    remove_column :categories, :budget_month
    add_reference :categories, :budget, optional: true
  end
end
