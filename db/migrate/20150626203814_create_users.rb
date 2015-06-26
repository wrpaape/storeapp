class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :password_digest, null: false
      t.string :email, null: false
      t.boolean :admin, default: false
      t.integer :addresses_count, default: 0
      t.integer :cart_items_count, default: 0
      t.integer :purchases_count, default: 0
      t.integer :products_count, default: 0

      t.timestamps null: false
    end
  end
end
