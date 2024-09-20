class AddReceivedAtAndLeftAtToPets < ActiveRecord::Migration[7.0]
  def change
    add_column :pets, :received_at, :datetime
    add_column :pets, :left_at, :datetime
  end
end
