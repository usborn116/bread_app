class AccountsController < ApplicationController
  before_action :set_account, only: %i[ show edit update destroy ]

  # GET /accounts or /accounts.json
  def index
    @accounts = Account.where(user_id: current_user.id).sort_by(&:subtype)
    render json: @accounts
  end

  # GET /accounts/1 or /accounts/1.json
  def show
    render json: @account
  end

  # GET /accounts/new
  def new
    @account = Account.new
  end

  # GET /accounts/1/edit
  def edit
  end

  # POST /accounts or /accounts.json
  def create
    @account = current_user.accounts.build(account_params)

    if @account.save
      render json: @account, status: :created, location: account_path(@account)
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /accounts/1 or /accounts/1.json
  def update
    if @account.update(account_params)
      render json: @account, location: account_path(@account)
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1 or /accounts/1.json
  def destroy
    n = @account.id
    Category.where(account_id: n).each{|c| c.update(account_id: 1)}
    @account.destroy
    Transaction.where(account_id: n).each{|t| t.destroy}

    respond_to do |format|
      format.html { redirect_to accounts_url, notice: "Account was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = Account.find(params[:id])
      @txns = Transaction.where(account_id: @account.account_id)
    end

    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:account_id, :available, :current, :limit, :last_four, :name, :official_name, :account_type, :subtype, :user_id, :instutition_name)
    end
end
