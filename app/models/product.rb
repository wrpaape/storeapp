class Product < ActiveRecord::Base
  has_many :purchases
  has_many :users, through: :purchases
  has_many :cart_items, dependent: :destroy
  validates :price, :numericality => { :greater_than_or_equal_to => 0 }
  validates :quantity, :numericality => { :greater_than_or_equal_to => 0 }
end
