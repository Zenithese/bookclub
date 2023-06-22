class Highlight < ApplicationRecord
    validates :text, :cfi_range, presence: true
    
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :book,
        foreign_key: :book_id,
        class_name: :Book

    has_many :comments, as: :commentable

    has_many :users, through: :comments, source: :user

    has_many :likes, as: :likeable

    has_many :comment_highlights

    has_many :notifications, as: :notifiable

    def likes_array
        likes.map { |like| like.user_id }
    end

    def recursive_delete(comments)
        comments.each do |comment|
            if comment.comments.length > 0
                recursive_delete(comment.comments)
            end
            comment.notifications.destroy_all
            comment.destroy
        end
    end

    default_scope { order("created_at DESC") }
end