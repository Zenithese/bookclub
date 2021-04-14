json.id @notification.id
json.actor @notification.actor.username
json.action @notification.action
json.read_at @notification.read_at
json.notifiable do
    json.type "a #{@notification.notifiable.class.to_s.underscore.humanize.downcase}"
end