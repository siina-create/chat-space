class Group < ApplicationRecord
  validates :name, presence: true
  has_many :messages
  has_many :users, through: :user_groups
  has_many :user_groups
  def show_last_message
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
