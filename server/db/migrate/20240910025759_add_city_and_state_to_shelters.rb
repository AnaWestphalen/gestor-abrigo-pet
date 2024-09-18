class AddCityAndStateToShelters < ActiveRecord::Migration[7.0]
  def change
    add_column :shelters, :city, :string
    add_column :shelters, :state, :string
  end
end
