class CreateShelterLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :shelter_logs do |t|
      t.references :shelter, null: false, foreign_key: true
      t.references :log, null: false, foreign_key: true

      t.timestamps
    end
  end
end
