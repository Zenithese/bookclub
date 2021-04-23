class Api::Comments::Notifications::LikesController < Api::LikesController
    
    private

    def set_like_notifications
        ((@likeable.users + [@likeable.user]).uniq - [current_user]).each do |user|
            Notification.create!(recipient: user, actor: current_user, action: "liked", notifiable: @like)
        end
    end

end