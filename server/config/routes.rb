Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  # Rotas para abrigos com rotas aninhadas de animais
  resources :shelters do
    collection do
      get :search
    end
    resources :pets do
      collection do
        get :search
      end
    end
  end

  # Rotas para animais fora do contexto de um abrigo
  resources :pets, only: [] do
    collection do
      get :search
    end
  end
end
