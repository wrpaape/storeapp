class UsersController < ApplicationController
  def index
    @users = User.all.
  end

  def new
    @user = User.new
  end


  def create
    if User.find_by(name: user_params[:name]) && User.find_by(email: user_params[:email])
      flash[:alert] = "username and email is already taken"
      render :new
    elsif User.find_by(name: user_params[:name])
      flash[:alert] = "username is already taken"
      render :new
    elsif User.find_by(email: user_params[:email])
      flash[:alert] = "email is already taken"
      render :new
    elsif user_params[:password] != user_params[:password_confirmation]
      flash[:alert] = "passwords do not match"
      render :new
    else
      user = User.new(user_params)
      if user.save
        session[:user_id] = user.id
        redirect_to root_path, notice: 'user created!'
      else
        flash[:alert] = 'errors occured.'
        render :new
      end
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
