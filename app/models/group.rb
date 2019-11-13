class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :user_groups
  has_many :user_groups
end
