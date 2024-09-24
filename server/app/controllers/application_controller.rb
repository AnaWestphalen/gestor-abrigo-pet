class ApplicationController < ActionController::Base
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
    flash[:alert] = "Você não tem permissão para realizar essa ação."
    redirect_to(request.referrer || root_path)
  end
end
