class SheltersController < ApplicationController
  before_action :set_shelter, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_action :authorize_user, only: [:new, :create, :edit, :update, :destroy]

  # GET /shelters
  def index
    @shelters = Shelter.all
  end

  # GET /shelters/:id
  def show
    if @shelter.latitude && @shelter.longitude
      @markers = [
        {
          lat: @shelter.latitude,
          lng: @shelter.longitude
        }
      ]
    end
  end

  # GET /shelters/new
  def new
    @shelter = Shelter.new
  end

  # POST /shelters
  def create
    @shelter = current_user.shelters.new(shelter_params)
    if @shelter.save
      redirect_to @shelter, notice: 'O abrigo foi registrado com sucesso!'
    else
      render :new
    end
  end

  # GET /shelters/:id/edit
  def edit
  end

  # PATCH/PUT /shelters/:id
  def update
    if @shelter.update(shelter_params)
      redirect_to @shelter, notice: 'O registro do abrigo foi atualizado com sucesso!'
    else
      render :edit
    end
  end

  # Search method
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

  # DELETE /shelters/:id
  def destroy
    @shelter.destroy
    redirect_to shelters_url, notice: 'O registro do abrigo foi excluído com sucesso!'
  end

  private

  # Callback to set shelter before actions like show, edit, update, and destroy
  def set_shelter
    @shelter = Shelter.find(params[:id])
  end

  # Check if the user has the role 'gestor' and the ownership of the shelter if applicable
  def authorize_user
    if current_user.role != 'gestor'
      redirect_to shelters_path, alert: 'Você não tem permissão para realizar esta ação.'
    elsif ['edit', 'update', 'destroy'].include?(action_name) && @shelter.created_by != current_user.id
      redirect_to shelters_path, alert: 'Você não tem permissão para editar este abrigo.'
    end
  end

  # Only allow a list of trusted parameters through
  def shelter_params
    params.require(:shelter).permit(:name, :address, :latitude, :longitude, :city, :state, :description, :contact, accepts: [])
  end
end
