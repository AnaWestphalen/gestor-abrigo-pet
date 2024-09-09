# == Schema Information
#
# Table name: pet_logs
#
#  id         :bigint           not null, primary key
#  pet_id     :bigint           not null
#  log_id     :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PetLog < ApplicationRecord
  belongs_to :pet
  belongs_to :log
end
