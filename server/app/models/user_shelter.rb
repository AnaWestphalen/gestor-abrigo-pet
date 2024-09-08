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

class UserShelter < ApplicationRecord
  belongs_to :user
  belongs_to :shelter

  validates :role, presence: true, uniqueness: true, length: { maximum: 100 }
end
