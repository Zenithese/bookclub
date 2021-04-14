class Api::Highlights::CommentsController < Api::Highlights::NotificationsController
    before_action :set_commentable

    private

    def set_commentable
        @commentable = Highlight.find(params[:highlight_id])
    end
end