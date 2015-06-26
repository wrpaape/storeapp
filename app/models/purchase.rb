class Purchase < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :product, counter_cache: true
  validates :quantity, :numericality => { :greater_than_or_equal_to => 1 }
  after_create :increment_users_counter_cache, :increment_products_counter_cache, :decrement_product_quantity
  before_destroy :decrement_users_counter_cache, :decrement_products_counter_cache, :increment_product_quantity

  private

  def increment_users_counter_cache
    unless self.user.products.find_by(id: self.product_id)
      User.increment_counter('products_count', self.user.id)
    end
  end

  def decrement_users_counter_cache
    if self.user.products.find_by(id: self.product_id)
      User.decrement_counter('products_count', self.user.id)
    end
  end

  def increment_products_counter_cache
    unless self.products.users.find_by(id: self.user_id)
      Product.increment_counter('users_count', self.product.id)
    end
  end

  def decrement_products_counter_cache
    if self.products.users.find_by(id: self.user_id)
      Product.decrement_counter('users_count', self.product.id)
    end
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

