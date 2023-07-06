class AddCategoryToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_reference :transactions, :group, foreign_key: {to_table: :categories}
  end
end
