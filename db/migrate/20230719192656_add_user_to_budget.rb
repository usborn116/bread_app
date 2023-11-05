class AddUserToBudget < ActiveRecord::Migration[7.0]
  def change
    add_reference :budgets, :user, optional: true
  end
end
