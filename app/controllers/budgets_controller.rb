class BudgetsController < ApplicationController
  before_action :set_budget, only: %i[ show edit update destroy ]

  # GET /budgets or /budgets.json
  def index
    @budgets = Budget.where(user_id: current_user.id).order(:created_at)
    render json: @budgets.to_json(:include => {:categories => {only: [:name, :current, :budget_amt]}})

  end

  # GET /budgets/1 or /budgets/1.json
  def show
    render :json => @budget.to_json(include: {categories: {only: [:name, :current, :budget_amt], include: :transactions}})
  end

  # GET /budgets/new
  def new
    @budget = Budget.new
  end

  # GET /budgets/1/edit
  def edit
  end

  # POST /budgets or /budgets.json
  def create
    @budget = current_user.budgets.build(budget_params)

    if @budget.save
      @budget.update_categories
      render json: @budget, status: :created, location: budget_path(@budget)
    else
      render json: @budget.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /budgets/1 or /budgets/1.json
  def update
    if @budget.update(budget_params)
      render json: @budget, location: budget_path(@budget)
    else
      render json: @budget.errors.messages, status: :unprocessable_entity
    end
  end

  # DELETE /budgets/1 or /budgets/1.json
  def destroy
    @budget.categories.each{|c| c.destroy}
    @budget.destroy

    respond_to do |format|
      format.html { redirect_to budgets_url, notice: "Budget was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_budget
      @budget = Budget.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def budget_params
      params.require(:budget).permit(:month, :year, :balance, :budget_amount, :start_date, :end_date, :rollover, :user_id)
    end
end