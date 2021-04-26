class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :comments, as: :commentable
    has_many :users, {:through=>:comments, :source=>"user"}
    has_many :likes, as: :likeable

    has_one :comment_highlight
    has_one :highlight, through: :comment_highlight

    has_many :notifications, as: :notifiable

    def likes_array
        likes.map { |like| like.user_id }
    end

    default_scope { order("created_at DESC") }
end
