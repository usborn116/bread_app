class ChangeCategoriesNotNullAccount < ActiveRecord::Migration[7.0]
  def change
    change_column :categories, :account_id, :bigint, null: true
  end
end
