class User < ActiveRecord::Base
  has_many :cart_items, dependent: :destroy
  has_many :products, through: :purchases
  has_secure_password
end
