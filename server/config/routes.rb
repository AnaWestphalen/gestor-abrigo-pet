Rails.application.routes.draw do
  scope '/api' do
    devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

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

        # Rotas aninhadas para logs relacionados aos pets
        resources :logs, only: %i[index show new create edit update destroy]
      end
    end

    # Rotas para animais fora do contexto de um abrigo
    resources :pets, only: [] do
      collection do
        get :search
      end
    end
  end
end
