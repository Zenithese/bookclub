class Api::ReadingsController < ApplicationController
    skip_before_action :verify_authenticity_token
    
    def readings
        @readings = User.find(params[:user_id]).books
    end

    def create
        @reading = Reading.new(reading_params)
        
        if @reading.save
            render :show
        else
            render json: @reading.errors.full_messages, status: 422
        end
    end

    def destroy
        @reading = Reading.find(params[:id])
        @reading.destroy
        render :show
    end

    private

    def reading_params
        params.require(:reading).permit(:user_id, :book_id)
    end

end