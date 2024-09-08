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

class ShelterLog < ApplicationRecord
  belongs_to :shelter
  belongs_to :log
end
