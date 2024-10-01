class ShelterPolicy < ApplicationPolicy
  attr_reader :user, :shelter

  def initialize(user, shelter)
    @user = user
    @shelter = shelter
  end

  # Todos os usuários podem ver a listagem de abrigos
  def index?
    true
  end

  # Todos os usuários podem ver o abrigo
  def show?
    true
  end

  # Apenas um "gestor" do abrigo pode criar um novo abrigo
  def create?
    user.role == 'gestor'
  end

  # Apenas um "gestor" do abrigo pode editar ou atualizar o abrigo
  def update?
    user.role == 'gestor' && shelter.creator == user
  end

  # Apenas um "gestor" pode destruir o abrigo
  def destroy?
    user.role == 'gestor' && shelter.creator == user
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
