class Api::Highlights::LikesController < Api::Highlights::Notifications::LikesController
    before_action :set_likeable

    private

    def set_likeable
        @likeable = Highlight.find(params[:highlight_id])
    end
end