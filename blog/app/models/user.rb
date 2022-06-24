class User < ApplicationRecord
    has_one :organisations
    has_many :shifts
end
