class ShiftSerializer < ActiveModel::Serializer
  attributes :id, :start, :finish, :break_length
  has_one :user
end
