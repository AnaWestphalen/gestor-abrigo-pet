# == Schema Information
#
# Table name: shelter_logs
#
#  id         :bigint           not null, primary key
#  shelter_id :bigint           not null
#  log_id     :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class ShelterLogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
