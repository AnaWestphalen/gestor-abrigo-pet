class ApplicationController < ActionController::API
  include Pundit

  # Desabilitar CSRF para rotas da API
  skip_before_action :verify_authenticity_token, if: :api_request?

  # Pundit: resgatar erros de autorização
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  # Verifica se a requisição pertence ao escopo da API
  def api_request?
    request.path.start_with?('/api')
  end

  def user_not_authorized
    render json: { error: 'Você não tem permissão para realizar essa ação.' }, status: :forbidden
  end
end
