class SheltersController < ApplicationController
  before_action :set_shelter, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  after_action :verify_authorized, except: [:index, :search]

  # GET /api/shelters
  def index
    @shelters = Shelter.all
  end

  # GET /api/shelters/:id
  def show
    authorize @shelter

    if @shelter.geocoded?
      @markers = [
        {
          lat: @shelter.latitude,
          lng: @shelter.longitude
        }
      ]
    end
  end

  # GET /api/shelters/new
  def new
    @shelter = Shelter.new
  end

  # POST /api/shelters
  def create
    @shelter = current_user.shelters.new(shelter_params)
    authorize @shelter
    if @shelter.save
      redirect_to @shelter, notice: 'O abrigo foi registrado com sucesso!'
    else
      render :new
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
      redirect_to @shelter, notice: 'O registro do abrigo foi atualizado com sucesso!'
    else
      render :edit
    end
  end

  # Search method (GET /api/shelters/search?name=X&city=Y)
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
    render :index
  end

  # DELETE /api/shelters/:id
  def destroy
    authorize @shelter
    @shelter.destroy
    redirect_to api_shelters_url, notice: 'O registro do abrigo foi excluído com sucesso!'
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
