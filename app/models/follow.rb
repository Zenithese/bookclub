class Follow < ApplicationRecord

    validates :user, uniqueness: { scope: :follow }

    belongs_to :user

    belongs_to :follow, class_name: :User

    has_many :notifications, as: :notifiable

end
