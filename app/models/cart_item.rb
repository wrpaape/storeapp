class CartItem < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :product, counter_cache: true
  validates :quantity, :numericality => { :greater_than_or_equal_to => 1 }
end
