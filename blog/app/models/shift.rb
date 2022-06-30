class Shift < ApplicationRecord
  belongs_to :user
  has_one :organisation, through: :user
end
