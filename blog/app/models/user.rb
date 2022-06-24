class User < ApplicationRecord
    has_many :shifts
    has_one :organisations

    has_secure_password

    validates :name, presence: true
    validates :name, uniqueness: true
end
