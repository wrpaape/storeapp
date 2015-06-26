class CreateCartItems < ActiveRecord::Migration
  def change
    create_table :cart_items do |t|
      t.belongs_to :user, index: true, foreign_key: true, counter_cache: true
      t.belongs_to :product, index: true, foreign_key: true, counter_cache: true
      t.integer :quantity, default: 1

      t.timestamps null: false
    end
  end
end
