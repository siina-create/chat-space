# Chat-Space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|Email|string|null: false,unique: true|
|Password|string|null: false|

### Association
- has_many  :chats
- has_many  :groups,  through:  :users_groups




