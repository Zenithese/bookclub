class Api::NotificationsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @notifications = Notification.where(recipient: current_user).order(:created_at)
        # + Notification.where(recipient: current_user).read
    end

    def mark_as_seen
        @notifications = Notification.where(recipient: current_user).unseen
        @notifications.update_all(seen: DateTime.now)
        render json: { count: 0 }
    end

    def not_seen
        @count = Notification.where(recipient: current_user).unseen.length
        render json: { count: @count }
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