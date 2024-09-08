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
#

class Pet < ApplicationRecord
  has_many :pet_shelters
  has_many :shelters, through: :pet_shelters

  has_many :pet_logs

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :specie, presence: true, uniqueness: true, length: { maximum: 50 }
  validates :description, presence: true, uniqueness: true, length: { maximum: 500 }
  validates :found_in, presence: true, uniqueness: true, length: { maximum: 100 }
end
