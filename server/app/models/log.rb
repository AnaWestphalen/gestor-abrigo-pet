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

class Log < ApplicationRecord
  belongs_to :created_by, class_name: 'User'
  has_many :pet_logs
  has_many :shelter_logs

  validates :content, presence: true, length: { maximum: 500 }
end
