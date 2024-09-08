class Shelter < ApplicationRecord
  has_many :user_shelters
  has_many :users, through: :user_shelters

  has_many :pet_shelters
  has_many :pets, through: :pet_shelters

  has_many :shelter_logs

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :address, presence: true, length: { maximum: 200 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :contact, presence: true, uniqueness: true

  validates :accepts, presence: true, length: { minimum: 1, message: 'must contain at least one accepted species' }

  validates :contact, format: { with: /\A\+?[0-9\s\-]+\z/, message: 'must be a valid phone number' }

  validates :latitude, numericality: {
    greater_than_or_equal_to: -90,
    less_than_or_equal_to: 90,
    message: 'must be between -90 and 90'
  }
  validates :longitude, numericality: {
    greater_than_or_equal_to: -180,
    less_than_or_equal_to: 180,
    message: 'must be between -180 and 180'
  }
end
