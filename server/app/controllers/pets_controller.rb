class PetsController < ApplicationController
  before_action :set_pet, only: [:show, :edit, :update, :destroy]
  before_action :authorize_pet, only: [:edit, :update, :destroy]
  before_action :authenticate_user!, except: [:search]
  before_action :authorize_shelter_user, only: [:new, :create]

  def authorize_pet
    authorize @pet
  end

  # GET /api/shelters/:shelter_id/pets
  def index
    @shelter = Shelter.find(params[:shelter_id])
    @pets = policy_scope(Pet).where(shelter: @shelter).includes(img_attachment: :blob)
    render json: @pets.as_json(
      only: [:id, :name, :specie, :color, :size, :age, :description, :found_in, :received_at, :left_at],
      methods: [:img_url]
    ), status: :ok
  end

  # GET /api/shelters/:shelter_id/pets/:id
  def show
    authorize @pet
    render json: @pet.as_json(
      only: [:id, :name, :specie, :color, :size, :age, :description, :found_in, :received_at, :left_at],
      methods: [:img_url]
    ), status: :ok
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
    @pet = @shelter.pets.new(pet_params)
    authorize @pet

    if @pet.save
      if params[:img].present?
        @pet.img.attach(params[:img])
      end

      render json: {
        message: 'O animal foi registrado com sucesso!',
        pet: pet_with_img_url(@pet)
      }, status: :created
    else
      render json: { errors: @pet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/shelters/:shelter_id/pets/:pet_id/edit
  def edit
  end

  # PATCH/PUT /api/shelters/:shelter_id/pets/:id
  def update
    authorize @pet

    if @pet.update(pet_params)
      if params[:img].present?
        @pet.img.purge if @pet.img.attached?
        @pet.img.attach(params[:img])
      end

      render json: {
        message: 'O registro do animal foi atualizado com sucesso!',
        pet: pet_with_img_url(@pet)
      }, status: :ok
    else
      render json: { errors: @pet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/shelters/:shelter_id/pets/:id
  def destroy
    authorize @pet
    @pet.destroy
    render json: { message: 'O registro do animal foi excluído com sucesso!' }, status: :no_content
  end

  # GET /api/shelters/:shelter_id/pets/search
  # GET /api/pets/search
  def search
    if params[:shelter_id].present?
      @shelter = Shelter.find(params[:shelter_id])
      @pets = @shelter.pets

      @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%") if params[:name].present?

      render json: @pets.as_json(
        only: [:id, :name, :specie, :color, :size, :age, :description, :found_in, :received_at, :left_at],
        methods: [:img_url]
      ), status: :ok
    else
      @pets = Pet.all
      @pets = @pets.where('name ILIKE ?', "%#{params[:name]}%") if params[:name].present?

      @pets_with_shelters = @pets.map do |pet|
        pet.as_json(
          only: [:id, :name, :specie, :color, :size, :age, :description, :found_in, :received_at, :left_at],
          methods: [:img_url]
        ).merge(shelter: pet.shelter.as_json(only: [:id, :name, :location]))
      end

      render json: @pets_with_shelters, status: :ok
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

  def pet_with_img_url(pet)
    pet.as_json(only: [:id, :name, :specie, :color, :size, :age, :description, :found_in, :received_at, :left_at]).merge(
      img_url: pet.img_url
    )
  end
end
