class CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show edit update destroy ]

  # GET /categories or /categories.json
  def index
    @categories = current_user.categories.sort_by(&:name)
    render json:@categories.to_json(:include => {:account => {only: [:name]}})
  end

  def budget_categories
    @budgets = current_user.categories.where(category_type: 'monthly')
    @accounts = Account.where(user_id: current_user.id)
    render json: {budgets: @budgets, accounts: @accounts}
  end

  def fund_categories
    @budgets = current_user.categories.where(category_type: 'fund')
    @accounts = Account.where(user_id: current_user.id)
    render json: {budgets: @budgets, accounts: @accounts}
  end

  # GET /categories/1 or /categories/1.json
  def show
    render json: @category.to_json(:include => {:account => {only: [:name]}})
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories or /categories.json
  def create
    @category = current_user.categories.build(category_params)

    if @category.save
      render json: @category, status: :created, location: category_path(@category)
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1 or /categories/1.json
  def update
    if @category.update(category_params)
      render json: @category, location: category_path(@category)
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1 or /categories/1.json
  def destroy
    @category.destroy

    render json: {message: 'Deleted!'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:category_type, :name, :current, :budget, :budget_amt, :user_id, :account_id)
    end
end
