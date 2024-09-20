class PetsController < ApplicationController
  before_action :set_pet, only: [:show, :edit, :update, :destroy]
  before_action :authorize_pet, only: [:edit, :update, :destroy]
  before_action :authenticate_user!, except: [:search]
  before_action :authorize_shelter_user, only: [:new, :create]
  before_action :authorize_gestor_role, only: [:destroy]

  def authorize_pet
    authorize @pet
  end

  # GET /shelters/:shelter_id/pets
  def index
    @shelter = Shelter.find(params[:shelter_id])
    @pets = policy_scope(Pet).where(shelter: @shelter)
  end

  # GET /shelters/:shelter_id/pets/:id
  def show
    @shelter = @pet.shelter
    authorize @pet
  end

  # GET /shelters/:shelter_id/pets/new
  def new
    @shelter = Shelter.find(params[:shelter_id])
    @pet = @shelter.pets.new
    authorize @pet
  end

  # POST /shelters/:shelter_id/pets
  def create
    @shelter = Shelter.find(params[:shelter_id])
    @pet = @shelter.pets.new(pet_params)
    authorize @pet
    if @pet.save
      redirect_to shelter_pets_path(@shelter), notice: 'O animal foi registrado com sucesso!'
    else
      render :new
    end
  end

  # GET /shelters/:shelter_id/pets/:id/edit
  def edit
    @shelter = @pet.shelter
    authorize @pet
  end

  # PATCH/PUT /shelters/:shelter_id/pets/:id
  def update
    authorize @pet
    if @pet.update(pet_params)
      @shelter = @pet.shelter
      redirect_to shelter_pet_path(@shelter, @pet), notice: 'O registro do animal foi atualizado com sucesso!'
    else
      render :edit
    end
  end

  # DELETE /shelters/:shelter_id/pets/:id
  def destroy
    authorize @pet
    @shelter = @pet.shelter
    @pet.destroy
    redirect_to shelter_pets_path(@shelter), notice: 'O registro do animal foi excluído com sucesso!'
  end

  def search
    if params[:shelter_id].present?
      @shelter = Shelter.find(params[:shelter_id])
      @pets = @shelter.pets

      if params[:name].present?
        @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%")
      end

      render :index
    else
      @pets = Pet.all

      if params[:name].present?
        @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%")
      end

      @shelters = Shelter.where(id: @pets.pluck(:shelter_id).uniq)

      render :search_results
    end
  end

  private

  def set_pet
    @pet = Pet.find(params[:id])
  end

  def pet_params
    params.require(:pet).permit(:name, :specie, :color, :size, :age, :description, :found_in, :tutor_name, :tutor_contact, :img, :received_at, :left_at)
  end

  def authorize_shelter_user
    @shelter = Shelter.find(params[:shelter_id])
    unless @shelter.users.include?(current_user)
      redirect_to root_path, alert: 'Você não tem permissão para acessar este abrigo.'
    end
  end

  def authorize_gestor_role
    unless current_user.role == 'gestor'
      redirect_to shelter_pets_path(@pet.shelters.first), alert: 'Você não tem permissão para excluir este registro.'
    end
  end
end
