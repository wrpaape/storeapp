class CartItemsController < ApplicationController
  def index
    @cart_items = CartItem.all
    if user_id = product_params_weak[:user_id]
      user = User.find(user_id)
      cart_items_arrs = { cart_item_ids: [], product_ids: [] }
      user.cart_items.each do |cart_item|
        cart_items_arrs[:cart_item_ids] << cart_item.id
        cart_items_arrs[:product_ids] << cart_item.product_id
      end
    end
    respond_to do |format|
      # format.html
      format.json { render json: cart_items_arrs }
    end
  end

  def new
  end

  def create
    authenticate_user!
    @cart_item = CartItem.create(cart_item_params_weak)
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Cart Item was successfully created.' }
      format.json { render json: @cart_item.id }
    end
  end

  def show
  end

  def edit
  end

  def update
    authenticate_user!
    @cart_item = CartItem.find(params[:id])
    @cart_item.update(quantity: cart_item_params_weak[:quantity])
    render json: @cart_item
  end

  def destroy
    authenticate_user!
    @cart_item = CartItem.find(params[:id])
    @cart_item.destroy
    render json: "Cart Item was successfully destroyed."
  end

  private

  def cart_item_params_strong
    params.require(:product).permit(:product_id, :user_id, :quantity)
  end

  def cart_item_params_weak
    params.permit(:product_id, :user_id, :quantity)
  end

end
