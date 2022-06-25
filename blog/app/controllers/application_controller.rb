class ApplicationController < ActionController::Base
    include ActionController::Cookies
    protect_from_forgery with: :null_session


    def current_user
      User.find_by(id: session[:user_id])
  end
end
