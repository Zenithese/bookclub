class Api::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )
        @user ||= User.find_by_email(
            params[:user][:email],
            params[:user][:password]
        )

        if @user
            login(@user)
            render "api/users/show"
        else
            render json: ["Invalid username/password combination"], status: 401
        end
    end

    def show
        if logged_in? && current_user
            @user = current_user
            login(@user)
            render "api/users/show"
        else 
            render json: ['Error with previous session'], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            render "api/users/show"
        else
            render json: ["Nobody signed in"], status: 404
        end
    end

end
