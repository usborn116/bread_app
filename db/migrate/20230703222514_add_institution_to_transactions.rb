class AddInstitutionToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :institution_name, :string
    add_column :transactions, :institution_name, :string
  end
end
