class LogsController < ApplicationController
  before_action :set_shelter
  before_action :set_pet
  before_action :set_log, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  # before_action :authorize_shelter_user
  # before_action :authorize_log_creator, only: [:edit, :update, :destroy]

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs
  def index
    @shelter = Shelter.find(params[:shelter_id])
    @pet = Pet.find(params[:pet_id])
    @logs = @pet.logs.includes(:created_by).map do |log|
      log.as_json.merge(created_by_email: log.created_by.email)
    end
    render json: @logs
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def show
    render json: @log
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
      render json: @log, status: :created
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
      render json: @log, status: :ok
    else
      render json: { errors: @log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/shelters/:shelter_id/pets/:pet_id/logs/:id
  def destroy
    @log.destroy
    head :no_content
  end

  private

  def set_shelter
    @shelter = Shelter.find(params[:shelter_id])
  end

  def set_pet
    @pet = Pet.find(params[:pet_id])
  end

  def set_log
    @log = Log.find(params[:id])
  end

  def log_params
    params.require(:log).permit(:content)
  end

  def authorize_shelter_user
    unless @shelter.users.include?(current_user)
      render json: { error: 'Você não tem permissão para acessar este abrigo.' }, status: :forbidden
    end
  end

  def authorize_log_creator
    unless @log.created_by == current_user
      render json: { error: 'Você não tem permissão para editar ou excluir este log.' }, status: :forbidden
    end
  end
end
