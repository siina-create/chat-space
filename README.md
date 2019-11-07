# Chat-Space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|Email|string|null: false,unique: true|
|Password|string|null: false|
### Association
- has_many  :messages
- has_many  :groups,  through:  :users_groups
- has_many  :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many  :messages
- has_many  :users,  through:  :users_groups
- has_many  :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group  _id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|message_time|integer||
|user_id|integer|null: false, foreign_key: true|
|group  _id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group








