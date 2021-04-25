json.array! @notifications do |notification|
    json.id notification.id
    json.actor notification.actor.username
    json.avatar_id notification.actor.avatar_id
    json.action notification.action
    json.read_at notification.read_at
    json.notifiable do
        if notification.notifiable.class.to_s == "Comment" || notification.notifiable.class.to_s == "Highlight"
            json.type "a #{notification.notifiable.commentable_type.downcase}"
            json.ancestor do
                json.type notification.notifiable.ancestor_type.downcase
                json.id notification.notifiable.ancestor_id 
            end
        elsif notification.notifiable.class.to_s == "Like"
            json.type "a #{notification.notifiable.likeable_type.downcase}"
            json.ancestor do
                json.type "highlight"
                json.id notification.notifiable.likeable_type == "Highlight" ? notification.notifiable.likeable_id : notification.notifiable.likeable.ancestor_id
            end
        elsif notification.notifiable.class.to_s == "Follow"
            json.type "you"
            json.ancestor do
                json.type "reader"
                json.id notification.actor_id
            end
        end
    end
end