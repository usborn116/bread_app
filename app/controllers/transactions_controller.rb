class TransactionsController < ApplicationController

  include Pagy::Backend

  before_action :set_transaction, only: %i[ show edit update destroy ]

  # GET /transactions or /transactions.json
  def index
    #@pagy, @transactions = pagy((Transaction.where(user_id: current_user.id).order('date DESC')))
    @transactions = Transaction.where(user_id: current_user.id).includes(:account).sort_by{|t| [t.date, t.updated_at]}.reverse
    @transactions = @transactions.map {|t| t.bank_account_name}
    @categories = current_user.categories.where(category_type: 'fund').or(current_user.categories.where(budget_month: Date::MONTHNAMES[Date.today.month]))
                .order(:name)
    render json: {transactions: @transactions, accounts: current_user.accounts.where(subtype: 'cash').order(:name), categories: @categories}
  end

  # GET /transactions/1 or /transactions/1.json
  def show
    @transaction = @transaction.bank_account_name
    render json: {transaction: @transaction, accounts: current_user.accounts.order(:name),
      categories: Category.where(user_id:current_user.id).order(:name).map{|c| c.name_with_month}}
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
  end

  # GET /transactions/1/edit
  def edit
  end

  # POST /transactions or /transactions.json
  def create
    @transaction = current_user.transactions.build(transaction_params)

    if @transaction.save
      @transaction.update_category
      Account.find_by(id: @transaction.account_id.to_i).decrement(:available, @transaction.amount).save
      render json: @transaction, status: :created, location: transaction_path(@transaction)
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transactions/1 or /transactions/1.json
  def update
    if @transaction.update(transaction_params)
      @transaction.update_category
      render json: @transaction, location: transaction_path(@transaction)
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1 or /transactions/1.json
  def destroy
    @transaction.destroy

    render json: {message: 'Deleted!'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def transaction_params
      params.require(:transaction).permit(:account_id, :amount, :date, :category, :name, :merchant, :description, :pending, :transaction_id, :transaction_type, :authorized_date, :user_id,  :category_id)
    end
end
