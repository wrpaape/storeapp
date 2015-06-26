class Purchase < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :product, counter_cache: true
  after_create :increment_users_counter_cache, :increment_products_counter_cache
  after_destroy :decrement_users_counter_cache, :decrement_products_counter_cache

  private

  def increment_users_counter_cache
    User.increment_counter( 'products_count', self.user.id )
  end

  def decrement_users_counter_cache
    User.decrement_counter( 'products_count', self.user.id )
  end

  def increment_products_counter_cache
    Product.increment_counter( 'users_count', self.product.id )
  end

  def decrement_products_counter_cache
    Product.decrement_counter( 'users_count', self.product.id )
  end
end

