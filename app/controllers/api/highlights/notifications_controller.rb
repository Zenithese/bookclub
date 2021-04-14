class Api::Highlights::NotificationsController < Api::CommentsController
    
    private

    def set_notifications
        ((@commentable.users + [@commentable.user]).uniq - [current_user]).each do |user|
            Notification.create!(recipient: user, actor: current_user, action: "commented on", notifiable: @comment)
        end
    end
end