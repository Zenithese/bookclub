class Api::Comments::NotificationsController < Api::CommentsController
    private

    def set_notifications
        ((@commentable.users + [@commentable.user]).uniq - [current_user]).each do |user|
            Notification.create!(recipient: user, actor: current_user, action: "replied to", notifiable: @comment)
        end
    end
end