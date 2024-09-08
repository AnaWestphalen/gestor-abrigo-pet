class CreateShelters < ActiveRecord::Migration[7.0]
  def change
    create_table :shelters do |t|
      t.string :img
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :description
      t.string :contact
      t.string :accepts, array: true, default: []
      t.integer :created_by

      t.timestamps
    end
  end
end
