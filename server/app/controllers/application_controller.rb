class ApplicationController < ActionController::API
  include Pundit::Authorization
  before_action :authenticate_user_from_jwt, unless: :login_request?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    render json: { error: 'Você não tem permissão para realizar essa ação.' }, status: :forbidden
  end

  def authenticate_user_from_jwt
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    begin
      decoded = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
      user_id = decoded['user_id']
      @current_user = User.find(user_id)
    rescue JWT::DecodeError
      render json: { error: 'Token inválido.' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def login_request?
    request.path == '/api/users/sign_in' || request.path == '/api/users/sign_out' || (request.path == '/api/users' && request.post?)
  end
end
