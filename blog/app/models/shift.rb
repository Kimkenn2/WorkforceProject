class Shift < ApplicationRecord
    has_one :users
    has_one :organisations, through: :users
end
