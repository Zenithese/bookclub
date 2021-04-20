json.array! @notifications do |notification|
    json.id notification.id
    json.actor notification.actor.username
    json.action notification.action
    json.read_at notification.read_at
    json.notifiable do
        json.type "a #{notification.notifiable.commentable_type.downcase}"
        # json.url `/#{notification.notifiable.ancestor_type.downcase}/#{notification.notifiable.ancestor_id}`
        json.ancestor do
            json.type notification.notifiable.ancestor_type.downcase
            json.id notification.notifiable.ancestor_id
        end
    end
end