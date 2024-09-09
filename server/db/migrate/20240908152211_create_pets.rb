class CreatePets < ActiveRecord::Migration[7.0]
  def change
    create_table :pets do |t|
      t.string :img
      t.string :name
      t.string :specie
      t.string :color
      t.string :size
      t.string :age
      t.string :description
      t.string :found_in
      t.string :tutor_name
      t.string :tutor_contact

      t.timestamps
    end
  end
end
