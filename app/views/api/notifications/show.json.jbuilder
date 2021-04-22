json.id @notification.id
json.actor @notification.actor.username
json.avatarId @notification.actor.avatar_id
json.action @notification.action
json.readAt @notification.read_at
json.notifiable do
    json.type "a #{@notification.notifiable.commentable_type.downcase}"
    json.ancestor do
        json.type @notification.notifiable.ancestor_type.downcase
        json.id @notification.notifiable.ancestor_id
    end
end