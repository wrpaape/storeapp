class User < ActiveRecord::Base
  has_many :addresses, dependent: :destroy
  has_many :cart_items, dependent: :destroy
  has_many :purchases
  has_many :products, through: :purchases
  has_secure_password
end
