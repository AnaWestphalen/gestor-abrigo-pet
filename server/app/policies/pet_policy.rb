class PetPolicy < ApplicationPolicy
  attr_reader :user, :pet

  def initialize(user, pet)
    @user = user
    @pet = pet
  end

  def index?
    user.shelters.include?(pet.shelter)
  end

  def show?
    user.shelters.include?(pet.shelter)
  end

  def create?
    user.shelters.include?(pet.shelter)
  end

  def update?
    user.shelters.include?(pet.shelter)
  end

  def destroy?
    user.role == 'gestor' && user.shelters.include?(pet.shelter)
  end

  def search?
    true
  end

  class Scope < Scope
    def resolve
      if user
        # Se o usuário está logado, retorna os pets dos abrigos aos quais ele está associado
        scope.joins(:shelter).where(shelters: { id: user.shelter_ids })
      else
        # Se o usuário não está logado, retorna todos os pets
        scope.all
      end
    end
  end
end
