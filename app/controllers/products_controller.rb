class ProductsController < ApplicationController
  def index
    sort_by = product_params_weak.fetch("sort_by", "created_at")
    sort_dir = product_params_weak.fetch("sort_dir", "DESC")
    @products = Product.order("#{sort_by} #{sort_dir}")
    respond_to do |format|
      format.html
      format.json { render json: @products }
    end
  end

  def new
    @product = Product.new
  end

  def create
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
    params.require(:product).permit(:name, :price, :category, :description, :quantity, :image, :cart_items_count, :purchases_count, :users_count, :sort_by, :sort_dir)
  end

  def product_params_weak
    params.permit(:name, :price, :category, :description, :quantity, :image, :cart_items_count, :purchases_count, :users_count, :sort_by, :sort_dir)
  end
end
