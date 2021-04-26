class Api::LikesController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def index
        @likes = Like.where(:user_id => current_user.id)
    end

    # def comment_likes
    #     @likes = Like.where(:user_id => current_user.id, :likeable_type => "Comment")
    # end

    def create
        @like = @likeable.likes.create(:user_id => current_user.id)
        if @like.save
            set_like_notifications

            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        @like = Like.find(params[:id])
        @like.notification.destroy
        @like.destroy
        render :show
    end
end