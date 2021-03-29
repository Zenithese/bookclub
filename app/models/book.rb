class Book < ApplicationRecord
    validates :title, :location, presence: true
    validates :title, uniqueness: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :highlights,
        foreign_key: :book_id

    def self.search(query)
        if query
            where("lower(title) LIKE ?", "%#{query.downcase}%" )
        end
    end

end