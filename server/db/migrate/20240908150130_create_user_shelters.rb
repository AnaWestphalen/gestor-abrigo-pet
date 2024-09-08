class CreateUserShelters < ActiveRecord::Migration[7.0]
  def change
    create_table :user_shelters do |t|
      t.references :user, null: false, foreign_key: true
      t.references :shelter, null: false, foreign_key: true
      t.string :role

      t.timestamps
    end
  end
end
