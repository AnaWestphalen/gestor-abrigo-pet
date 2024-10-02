class ApplicationController < ActionController::API
  include Pundit::Authorization
  before_action :authenticate_user_from_jwt, unless: :login_request?
  before_action :disable_session
  before_action :skip_devise_store_location

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    Rails.logger.info "Usuário não autorizado: #{current_user&.id} tentou acessar #{request.path}"
    render json: { error: 'Você não tem permissão para realizar essa ação.' }, status: :forbidden
  end

  def authenticate_user_from_jwt
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?

    if token.present?
      Rails.logger.info "Token JWT recebido: #{token}"

      begin
        decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')[0]
        user_id = decoded['user_id']
        Rails.logger.info "ID de usuário decodificado: #{user_id}"

        @current_user = User.find_by(id: user_id)

        if @current_user
          Rails.logger.info "Usuário autenticado: #{@current_user.email}"
          sign_in(@current_user, store: false)
        else
          Rails.logger.error "Usuário com ID #{user_id} não encontrado."
          render json: { error: 'Usuário não encontrado.' }, status: :unauthorized
        end
      rescue JWT::ExpiredSignature
        Rails.logger.error 'Token expirado.'
        render json: { error: 'Token expirado.' }, status: :unauthorized
      rescue JWT::DecodeError => e
        Rails.logger.error "Erro ao decodificar JWT: #{e.message}"
        render json: { error: 'Token inválido.' }, status: :unauthorized
      end
    else
      Rails.logger.error 'Token não fornecido.'
      render json: { error: 'Token não fornecido.' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def login_request?
    request.path == '/api/users/sign_in' || request.path == '/api/users/sign_out' || (request.path == '/api/users' && request.post?)
  end

  def disable_session
    request.session_options[:skip] = true
  end

  def skip_devise_store_location
    request.env["devise.skip_storage"] = true if request.format.json?
  end
end
