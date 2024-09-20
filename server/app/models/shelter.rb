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

class Shelter < ApplicationRecord
  include PgSearch::Model

  belongs_to :user, foreign_key: :created_by
  has_many :user_shelters
  has_many :users, through: :user_shelters
  has_many :pets
  has_many :shelter_logs

  geocoded_by :full_address
  after_validation :geocode, if: :address_or_location_changed?

  pg_search_scope :global_search,
  against: [:name, :city],
  using: {
    tsearch: { prefix: true }
  }

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :address, presence: true, length: { maximum: 200 }
  validates :city, presence: true, length: { maximum: 100 }
  validates :state, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :contact, presence: true, uniqueness: true
  validates :accepts, presence: true, length: { minimum: 1, message: 'must contain at least one accepted species' }
  validates :contact, format: { with: /\A\+?[0-9\s\-]+\z/, message: 'must be a valid phone number' }

  def full_address
    [address, city, state].compact.join(', ')
  end

  def address_or_location_changed?
    will_save_change_to_address? || will_save_change_to_city? || will_save_change_to_state?
  end
end
