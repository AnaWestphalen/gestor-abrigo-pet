class DropPetSheltersTable < ActiveRecord::Migration[7.0]
  def up
    drop_table :pet_shelters do |t|
      t.bigint :pet_id, null: false
      t.bigint :shelter_id, null: false
      t.datetime :received_at
      t.datetime :left_at

      t.timestamps
    end
  end

  def down
    create_table :pet_shelters do |t|
      t.bigint :pet_id, null: false
      t.bigint :shelter_id, null: false
      t.datetime :received_at
      t.datetime :left_at

      t.timestamps
    end

    add_index :pet_shelters, [:pet_id, :shelter_id], unique: true
  end
end
