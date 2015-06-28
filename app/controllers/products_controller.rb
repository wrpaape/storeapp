class ProductsController < ApplicationController
  def index
    sort_by = product_params_weak["sort_by"]
    sort_dir = product_params_weak["sort_dir"]
    @products = Product.order("#{sort_by} #{sort_dir}")
    respond_to do |format|
      format.html
      format.json { render json: @products }
    end
  end

  def search
    sort_by = product_params_weak["sort_by"]
    sort_dir = product_params_weak["sort_dir"]
    name = "%" + product_params_weak["name"].to_s + "%"
    category = "%" + product_params_weak["category"].to_s + "%"
    price_min = product_params_weak["price_min"].to_s
    price_max = product_params_weak["price_max"].to_s
    price_min = 0 if price_min == ""
    price_max = (Product.maximum(:price) + 1) if price_max == ""
    @products = Product.where("lower(name) LIKE lower('#{name}') AND lower(category) LIKE lower('#{category}') AND price > #{price_min} AND price < #{price_max}").order("#{sort_by} #{sort_dir}")
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
    @product = Product.find(params[:id])
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def product_params_strong
    params.require(:product).permit(:name, :price, :category, :description, :quantity, :image, :cart_items_count, :purchases_count, :users_count, :sort_by, :sort_dir, :price_min, :price_max)
  end

  def product_params_weak
    params.permit(:name, :price, :category, :description, :quantity, :image, :cart_items_count, :purchases_count, :users_count, :sort_by, :sort_dir, :price_min, :price_max)
  end
end
