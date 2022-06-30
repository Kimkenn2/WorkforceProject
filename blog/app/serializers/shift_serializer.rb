class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :finish
  has_one :user
end
