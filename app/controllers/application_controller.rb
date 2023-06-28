class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    protect_from_forgery prepend: true
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!
end
