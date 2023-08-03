# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_03_230136) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "account_id"
    t.float "available"
    t.float "current"
    t.float "limit"
    t.string "last_four"
    t.string "name"
    t.string "official_name"
    t.string "account_type"
    t.string "subtype"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "institution_name"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.string "month"
    t.float "balance"
    t.float "budget_amount"
    t.date "start_date"
    t.date "end_date"
    t.float "rollover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "year"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_type"
    t.string "name"
    t.float "current"
    t.boolean "budget"
    t.float "budget_amt"
    t.bigint "user_id", null: false
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "budget_type"
    t.string "status"
    t.bigint "budget_id"
    t.string "budget_month"
    t.index ["account_id"], name: "index_categories_on_account_id"
    t.index ["budget_id"], name: "index_categories_on_budget_id"
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "plaid_credentials", force: :cascade do |t|
    t.string "link_token"
    t.string "access_token"
    t.string "item_id"
    t.string "cursor"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "institution_name"
    t.string "institution_id"
    t.index ["user_id"], name: "index_plaid_credentials_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "account_id"
    t.float "amount"
    t.date "date"
    t.text "category"
    t.string "name"
    t.string "merchant"
    t.string "description"
    t.boolean "pending"
    t.string "transaction_id"
    t.string "transaction_type"
    t.date "authorized_date"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "institution_name"
    t.bigint "category_id"
    t.index ["category_id"], name: "index_transactions_on_category_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "categories", "accounts"
  add_foreign_key "categories", "users"
  add_foreign_key "plaid_credentials", "users"
  add_foreign_key "transactions", "categories"
  add_foreign_key "transactions", "users"
end
