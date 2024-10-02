class CustomFailureApp < Devise::FailureApp
  def respond
    log_failed_authentication
    Rails.logger.info "Respondendo com erro de autenticação."
    json_error_response
  end

  def json_error_response
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { error: 'Falha na autenticação. Verifique suas credenciais.' }.to_json
  end

  private

  def log_failed_authentication
    token = request.headers['Authorization']&.split(' ')&.last

    if token.present?
      begin
        decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')[0]
        user_id = decoded['user_id']

        Rails.logger.info "Tentativa de autenticação falhou para o user_id: #{user_id}"
      rescue JWT::DecodeError => e
        Rails.logger.error "Erro ao decodificar o JWT: #{e.message}"
      end
    else
      Rails.logger.error "Token não fornecido na requisição."
    end
  end
end
