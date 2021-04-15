class Notification < ApplicationRecord
    belongs_to :recipient, class_name: "User"
    belongs_to :actor, class_name: "User"
    belongs_to :notifiable, polymorphic: true
    scope :unread, -> { where(read_at: nil) } 
    scope :read, -> { where.not(read_at: nil) } 
    scope :unseen, -> { where(seen: nil) } 
    default_scope { order("created_at DESC") }
end
