class PetsController < ApplicationController
  before_action :set_pet, only: [:show, :edit, :update, :destroy]
  before_action :authorize_pet, only: [:edit, :update, :destroy]
  before_action :authenticate_user!, except: [:search]
  before_action :authorize_shelter_user, only: [:new, :create]
  before_action :authorize_gestor_role, only: [:destroy]

  def authorize_pet
    authorize @pet
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs
  def index
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @logs = @pet.logs
    render json: @pets
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def show
    render json: @pet
  end

  # GET /shelters/:shelter_id/pets/:pet_id/logs/new
  def new
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @log = @pet.logs.build
  end

  # POST /api/shelters/:shelter_id/pets
  def create
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @log = Log.new(log_params)
    @log.created_by = current_user

    if @log.save
      PetLog.create(pet: @pet, log: @log)
      render json: { message: 'Log criado com sucesso.', log: @log }, status: :created
    else
      render json: { errors: @log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs/:id/edit
  def edit
  end

  # PATCH/PUT /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def update
    if @log.update(log_params)
      render json: { message: 'Log atualizado com sucesso.', log: @log }, status: :ok
    else
      render json: { errors: @log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def destroy
    authorize @pet
    @shelter = @pet.shelter
    @pet.destroy
    head :no_content
  end

  def search
    if params[:shelter_id].present?
      @shelter = Shelter.find(params[:shelter_id])
      @pets = @shelter.pets

      if params[:name].present?
        @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%")
      end

      render json: @pets
    else
      @pets = Pet.all

      if params[:name].present?
        @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%")
      end

      @shelters = Shelter.where(id: @pets.pluck(:shelter_id).uniq)

      render json: @pets
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
      render json: { error: 'Você não tem permissão para acessar este abrigo.' }, status: :forbidden
    end
  end

  def authorize_gestor_role
    unless current_user.role == 'gestor'
      render json: { error: 'Você não tem permissão para excluir este registro.' }, status: :forbidden
    end
  end
end
