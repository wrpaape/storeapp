users_count = 100
products_count = 100

(users_count - 1).times do
  User.create(name: Faker::Name.name,
             email: Faker::Internet.email,
   password_digest: BCrypt::Password.create(Faker::Internet.password))

end

User.create(name: "admin",
           email: "admin@admin.com",
 password_digest: BCrypt::Password.create("admin"),
           admin: true)

User.all.each do |user|
  rand(4).times do
    user.addresses.create(street: Faker::Address.street_address,
                            city: Faker::Address.city,
                           state: Faker::Address.state,
                             zip: Faker::Address.zip)
  end
end

products_count.times do
  Product.create(name: Faker::Commerce.product_name,
                price: Faker::Commerce.price,
             category: Faker::Commerce.department,
          description: LiterateRandomizer.paragraph,
             quantity: rand(1..1000),
                image: ImageSuckr::GoogleSuckr.new.get_image_url)
end

User.all.sample(rand((users_count / 2)..users_count)).each do |user|
  rand(4).times do
    product = Product.all.sample
    user.purchases.create(product_id: product.id,
                            quantity: rand((product.quantity / 3.0).ceil))
  end
  rand(4).times do
    product = Product.all.sample
    user.cart_items.create(product_id: product.id,
                             quantity: rand((product.quantity / 3.0).ceil))
  end

end
