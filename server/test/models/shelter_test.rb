# == Schema Information
#
# Table name: shelters
#
#  id          :bigint           not null, primary key
#  img         :string
#  name        :string
#  address     :string
#  latitude    :float
#  longitude   :float
#  description :string
#  contact     :string
#  accepts     :string           default([]), is an Array
#  created_by  :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  city        :string
#  state       :string
#
require "test_helper"

class ShelterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
