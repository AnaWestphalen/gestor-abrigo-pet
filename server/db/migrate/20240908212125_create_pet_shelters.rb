class CreatePetShelters < ActiveRecord::Migration[7.0]
  def change
    create_table :pet_shelters do |t|
      t.references :pet, null: false, foreign_key: true
      t.references :shelter, null: false, foreign_key: true
      t.datetime :received_at
      t.datetime :left_at

      t.timestamps
    end
  end
end
