class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    has_many :comments, as: :commentable
    has_many :users, through: :comments
    # belongs_to :comment, -> { where(commentable_type: 'Comment') }, foreign_key: :commentable_id
end
