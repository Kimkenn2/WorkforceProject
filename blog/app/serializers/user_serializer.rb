class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email_address, :organisation_id
end
