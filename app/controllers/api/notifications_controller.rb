class Api::NotificationsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @notifications = Notification.where(recipient: current_user).unread
    end

    def update
        @notification = Notification.find(params[:id])
        if @notification.update(:read_at => DateTime.now)
            render :show
        else
            render json: @notification.errors.full_messages, status: 422
        end
    end
end