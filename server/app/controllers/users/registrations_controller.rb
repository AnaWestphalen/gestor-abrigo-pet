# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # POST /resource
  def create
    build_resource

    resource.role = params[:user][:role]
    resource.phone = params[:user][:phone]

    if resource.save
      render json: { message: 'Usuário criado com sucesso.', user: resource }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role, :phone)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :current_password, :role, :phone)
  end
end
