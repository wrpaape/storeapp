Rails.application.routes.draw do

  get 'users/:id/cart', to: 'users#cart_index'
  delete 'users/:id/cart', to: 'users#destroy_cart'
  get 'products/search'

  resources :users, :products, :cart_items, :purchases

  get  'login', to: 'sessions#new',    as: 'login'
  post 'login', to: 'sessions#create', as: 'create_session'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  root 'products#index'
end
