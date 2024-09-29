class SheltersController < ApplicationController
  before_action :set_shelter, only: [:show, :edit, :update, :destroy]
  # before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :authenticate_user_from_jwt, only: [:create, :update, :destroy]
  after_action :verify_authorized, except: [:index, :search]

  # GET /api/shelters
  def index
    @shelters = Shelter.all
    render json: @shelters
  end

  # GET /api/shelters/:id
  def show
    authorize @shelter

    response = { shelter: @shelter }

    if @shelter.geocoded?
      @markers = [
        {
          lat: @shelter.latitude,
          lng: @shelter.longitude
        }
      ]
    end

    render json: response
  end

  # GET /api/shelters/new
  def new
    @shelter = Shelter.new
  end

  # POST /api/shelters
  def create
    @shelter = Shelter.new(shelter_params)
    @shelter.creator = current_user

    authorize @shelter

    if @shelter.save
      render json: @shelter, status: :created
    else
      render json: { errors: @shelter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/shelters/:id/edit
  def edit
    authorize @shelter
  end

  # PATCH/PUT /api/shelters/:id
  def update
    authorize @shelter
    if @shelter.update(shelter_params)
      render json: @shelter
    else
      render json: { errors: @shelter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Search method (GET /api/shelters/search?name=X&city=Y)
  # GET /api/shelters/search
  def search
    if params[:name].present? && params[:city].present?
      @shelters = Shelter.where('name ILIKE ? AND city ILIKE ?', "%#{params[:name]}%", "%#{params[:city]}%")
    elsif params[:name].present?
      @shelters = Shelter.where('name ILIKE ?', "%#{params[:name]}%")
    elsif params[:city].present?
      @shelters = Shelter.where('city ILIKE ?', "%#{params[:city]}%")
    else
      @shelters = Shelter.all
    end
    render json: @shelters
  end

  # DELETE /api/shelters/:id
  def destroy
    authorize @shelter
    @shelter.destroy
    head :no_content
  end

  private

  # Callback to set shelter before actions like show, edit, update, and destroy
  def set_shelter
    @shelter = Shelter.find(params[:id])
  end

  # Only allow a list of trusted parameters through
  def shelter_params
    params.require(:shelter).permit(:name, :address, :latitude, :longitude, :city, :state, :description, :contact, accepts: [])
  end
end
