class Organisation < ApplicationRecord
    has_many :users
    has_many :shifts, through: :user
end
