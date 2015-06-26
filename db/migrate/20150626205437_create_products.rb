class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.float :price, null:false
      t.string :category
      t.text :description
      t.integer :quantity
      t.string :image
      t.integer :carts_counter, default: 0
      t.integer :purchases_counter, default: 0

      t.timestamps null: false
    end
  end
end
