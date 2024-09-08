# == Schema Information
#
# Table name: pet_shelters
#
#  id          :bigint           not null, primary key
#  pet_id      :bigint           not null
#  shelter_id  :bigint           not null
#  received_at :datetime
#  left_at     :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "test_helper"

class PetShelterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
