class Comment < ApplicationRecord
    belongs_to :commentable, polymorphic: true
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    has_many :comments, as: :commentable
    has_many :users, {:through=>:comments, :source=>"user"}
    has_many :likes, as: :likeable

    def likes_array
        likes.map { |like| like.user.username }
    end
end
