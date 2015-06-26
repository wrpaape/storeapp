Rails.application.routes.draw do

  resources :users, :products, :cart_items, :purchases

end
