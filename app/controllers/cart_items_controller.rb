class CartItemsController < ApplicationController
  def index
  end

  def new
  end

  def create
    @cart_item = CartItem.create(product_params_weak)
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
  end

  def destroy
  end

  private

  def product_params_strong
    params.require(:product).permit(:product_id, :user_id, :quantity)
  end

  def product_params_weak
    params.permit(:product_id, :user_id, :quantity)
  end

end
