class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.string :street, null: false
      t.string :city, null: false
      t.integer :zip, null: false
      t.string :country, null: false

      t.timestamps null: false
    end
  end
end
