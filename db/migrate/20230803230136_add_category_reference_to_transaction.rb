class AddCategoryReferenceToTransaction < ActiveRecord::Migration[7.0]
  def change
    rename_column :transactions, :group_id, :category_id
  end
end
