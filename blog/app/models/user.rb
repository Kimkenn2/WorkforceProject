class User < ApplicationRecord
    has_many :shifts
    has_one :organisation

    has_secure_password

    validates :name, :email_address, presence: true
    validates :name, :email_address, uniqueness: true
end
