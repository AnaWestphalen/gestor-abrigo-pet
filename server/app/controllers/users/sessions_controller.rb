# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)

    render json: { message: 'Login realizado com sucesso.', user: resource }, status: :ok
  rescue
    render json: { error: 'Credenciais inválidas.' }, status: :unauthorized
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out(resource_name) == :destroy)

    if signed_out
      render json: { message: 'Logout realizado com sucesso.', redirect_to: root_url }, status: :ok
    else
      render json: { error: 'Erro ao realizar logout.' }, status: :unprocessable_entity
    end
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
