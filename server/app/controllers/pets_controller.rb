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
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def show
  end

  # GET /shelters/:shelter_id/pets/:pet_id/logs/new
  def new
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @log = @pet.logs.build
  end

  # POST /api/shelters/:shelter_id/pets/:pet_id/logs
  def create
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @log = Log.new(log_params)
    @log.created_by = current_user

    if @log.save
      PetLog.create(pet: @pet, log: @log)
      redirect_to shelter_pet_logs_path(@shelter, @pet), notice: 'Log criado com sucesso.'
    else
      render :new
    end
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs/:id/edit
  def edit
  end

  # PATCH/PUT /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def update
    if @log.update(log_params)
      redirect_to shelter_pet_log_path(@shelter, @pet, @log), notice: 'Log atualizado com sucesso.'
    else
      render :edit
    end
  end

  # DELETE /api/shelters/:shelter_id/pets/:pet_id/logs/:id
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
