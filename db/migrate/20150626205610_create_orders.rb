class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :item, index: true, foreign_key: true
      t.boolean :purchased
      t.boolean :cart, default:

      t.timestamps null: false
    end
  end
end
