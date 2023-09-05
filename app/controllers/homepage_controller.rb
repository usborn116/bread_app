class HomepageController < ApplicationController
  def index
    
  end

  def user
    if current_user
      render json: current_user.id
    else
      render json: false
    end
  end

end
