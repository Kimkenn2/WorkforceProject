class Shift < ApplicationRecord
  belongs_to :user
  has_one :organisation, through: :user

  validates :user_id, presence: true
end
