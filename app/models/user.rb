class User < ApplicationRecord

    attr_reader :password

    validates :username, :password_digest, :session_token, presence: true
    validates :username, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    
    after_initialize :ensure_session_token

    has_many :highlights,
        foreign_key: :user_id

    has_many :comments,
        foreign_key: :user_id
        
    has_many :followings, class_name: :Follow
    has_many :follows, through: :followings

    has_many :received_followings, class_name: :Follow, foreign_key: :follow_id
    has_many :received_follows, through: :received_followings, source: :user

    has_many :readings, class_name: :Reading
    has_many :books, through: :readings

    has_many :notifications, foreign_key: :recipient_id

    has_many :likes, foreign_key: :user_id

    # follows ######################################
    def follows?(id)
        follows.include?(User.find(id))
    end


    # sessions #####################################
    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def self.find_by_email(email, password)
        user = User.find_by(email: email)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_session_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_unique_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_unique_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
        end
        self.session_token
    end
end
