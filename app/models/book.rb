class Book < ApplicationRecord
    validates :title, :location, presence: true
    validates :title, uniqueness: true

    has_many :highlights,
        foreign_key: :book_id

    def self.search(query)
        if query
            where("lower(title) LIKE ?", "%#{query.downcase}%" )
        end
    end

end