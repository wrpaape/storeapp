class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :email
      t.boolean :admin
      t.string :street
      t.string :city
      t.integer :zip
      t.string :country
      t.integer :orders_count

      t.timestamps null: false
    end
  end
end
