class Api::FollowsController < ApplicationController

    def index
        @follows = User.find(current_user.id).follows
    end

    def create
        @follow = Follow.new(follow_params)
        
        if @follow.save
            @follow = @follow.follow
            render :show
        else
            render json: @follow.errors.full_messages, status: 422
        end
    end

    def destroy
        @follow = Follow.find(params[:id])
        @follow.destroy
        @follow = @follow.follow
        render :show
    end

    private

    def follow_params
        params.require(:follow).permit(:user_id, :follow_id)
    end

end