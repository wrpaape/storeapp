class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.float :price, null:false
      t.string :category, default: "N/A"
      t.text :description, default: "N/A"
      t.integer :quantity, default: 0
      t.string :image
      t.integer :cart_items_count, default: 0
      t.integer :purchases_count, default: 0
      t.integer :users_count, default: 0

      t.timestamps null: false
    end
  end
end
