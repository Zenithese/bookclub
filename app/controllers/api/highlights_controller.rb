class Api::HighlightsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        # @highlights = Highlight.all.includes(:comments)
        @highlights = Highlight.where(user_id: current_user.id)
        # if params[:id] && params[:book_id]
        #     if params[:id].to_i == current_user.id
        #         @highlights = Highlight.where(user_id: params[:id], book_id: params[:book_id])
        #     else
        #         @highlights = Highlight.where(user_id: params[:id], book_id: params[:book_id]) if current_user.follows?(params[:id])
        #     end
        # else
        #     @highlights = Highlight.all
        # end
    end

    def search
        if params[:book_id] == "undefined"
            @highlights = Highlight.where(user_id: params[:id])
        elsif current_user.follows?(params[:id]) || params[:id].to_i == current_user.id
            @highlights = Highlight.where(user_id: params[:id], book_id: params[:book_id])
        end

        render :index
    end

    def create
        @highlight = Highlight.new(highlight_params)
        
        if @highlight.save
            render :show
        else
            render json: @highlight.errors.full_messages, status: 422
        end
    end

    def show
        @highlight = Highlight.find(params[:id])
    end

    def destroy
        @highlight = Highlight.find(params[:id])
        @highlight.destroy
        render :show
    end

    def update
        @highlight = Highlight.find(params[:id])
        if @highlight.update(highlight_params)
            render :show
        else
            render json: @highlight.errors.full_messages, status: 422
        end
    end

    # private

    def highlight_params
        params.require(:highlight).permit(:text, :cfi_range, :user_id, :book_id)
    end

end
