class Product < ActiveRecord::Base
  has_many :purchases
  has_many :users, through: :purchases
  has_many :cart_items, dependent: :destroy
  validates :price, :numericality => { :greater_than_or_equal_to => 0 }
  validates :quantity, :numericality => { :greater_than_or_equal_to => 0 }
  after_initialize :init

  private

  def init
    self.image ||= "http://img1.wikia.nocookie.net/__cb20141028171337/pandorahearts/images/a/ad/Not_available.jpg"
  end
end
