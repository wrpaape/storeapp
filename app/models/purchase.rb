class Purchase < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :product, counter_cache: true
  validates :quantity, :numericality => { :greater_than_or_equal_to => 1 }
  after_create :increment_users_counter_cache, :increment_products_counter_cache, :decrement_product_quantity
  before_destroy :increment_product_quantity
  after_destroy :decrement_users_counter_cache, :decrement_products_counter_cache

  private

  def increment_users_counter_cache
    User.increment_counter('products_count', self.user.id)
  end

  def decrement_users_counter_cache
    User.decrement_counter('products_count', self.user.id)
  end

  def increment_products_counter_cache
    Product.increment_counter('users_count', self.product.id)
  end

  def decrement_products_counter_cache
    Product.decrement_counter('users_count', self.product.id)
  end

  def increment_product_quantity
    self.product.quantity += self.quantity
    self.product.save
  end

  def decrement_product_quantity
    self.product.quantity -= self.quantity
    self.product.save
  end
end

