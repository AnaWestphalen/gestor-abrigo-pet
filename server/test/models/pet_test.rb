# == Schema Information
#
# Table name: pets
#
#  id            :bigint           not null, primary key
#  img           :string
#  name          :string
#  specie        :string
#  color         :string
#  size          :string
#  age           :string
#  description   :string
#  found_in      :string
#  tutor_name    :string
#  tutor_contact :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shelter_id    :bigint
#  received_at   :datetime
#  left_at       :datetime
#
require "test_helper"

class PetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
