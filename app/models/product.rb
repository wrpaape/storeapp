class Product < ActiveRecord::Base
  has_many :purchases
  has_many :cart_items, dependent: :destroy
  has_many :users, through: :purchases
  validates :price, :numericality => { :greater_than_or_equal_to => 0 }
end
