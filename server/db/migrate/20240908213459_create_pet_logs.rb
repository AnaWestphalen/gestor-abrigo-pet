class CreatePetLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :pet_logs do |t|
      t.references :pet, null: false, foreign_key: true
      t.references :log, null: false, foreign_key: true

      t.timestamps
    end
  end
end
