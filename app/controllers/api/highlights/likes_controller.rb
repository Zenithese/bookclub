class Api::Highlights::LikesController < Api::LikesController
    before_action :set_likeable

    private

    def set_likeable
        @likeable = Highlight.find(params[:highlight_id])
    end
end