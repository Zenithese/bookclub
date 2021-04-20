class Api::Highlights::NotificationsController < Api::CommentsController
    
    private

    def set_notifications
        ((@commentable.users + [@commentable.user]).uniq - [current_user]).each do |user|
            Notification.create!(recipient: user, actor: current_user, action: "commented on", notifiable: @comment)
        end
    end

    # def all_users(comment)
    #     users = comment.users
    #     comment.comments.each do |comment|
    #         if comment.comments.length > 0
    #             users += all_users(comment)
    #         end
    #     end
    #     return users
    # end
end