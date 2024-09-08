# == Schema Information
#
# Table name: user_shelters
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  shelter_id :bigint           not null
#  role       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class UserShelterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
