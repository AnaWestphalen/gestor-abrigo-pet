# == Schema Information
#
# Table name: logs
#
#  id            :bigint           not null, primary key
#  content       :text
#  created_by_id :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class LogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
