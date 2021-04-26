class Api::FollowsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        @follows = Follow.where(:user_id => current_user.id)
    end

    def create
        @follow = Follow.new(:user_id => current_user.id, :follow_id => params[:follow_id])
        
        if @follow.save
            Notification.create!(recipient: @follow.follow, actor: current_user, action: "follows", notifiable: @follow)
            
            render :show
        else
            render json: @follow.errors.full_messages, status: 422
        end
    end

    def destroy
        @follow = Follow.find(params[:id])
        @follow.notifications.destroy_all
        @follow.destroy
        render :show
    end

    private

    def follow_params
        params.require(:follow).permit(:user_id, :follow_id)
    end

end