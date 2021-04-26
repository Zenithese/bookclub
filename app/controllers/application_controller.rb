class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session

    helper_method :current_user, :logged_in?

    private

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login(user)
        
        user.reset_session_token!
        session[:session_token] = user.session_token
        @current_user = user
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def require_logged_in
        unless current_user
        render json: { base: ['invalid credentials'] }, status: 401
        end
    end

    def recursive_delete(comments)
        comments.each do |comment|
            if comment.comments.length > 0
                recursive_delete(comment.comments)
            end
            comment.likes.each do |like| 
                like.notification.destroy if like.notification
                like.destroy
            end
            comment.notifications.destroy_all
            comment.destroy
        end
    end
end

