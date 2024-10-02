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
#  shelter_id    :bigint
#  received_at   :datetime
#  left_at       :datetime
#

class Pet < ApplicationRecord
  belongs_to :shelter

  has_many :pet_logs
  has_many :logs, through: :pet_logs

  has_one_attached :img

  validates :name, presence: true, length: { maximum: 100 }
  validates :specie, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :found_in, presence: true, length: { maximum: 100 }

  # Validação para garantir que 'left_at' seja posterior a 'received_at'
  validate :left_at_after_received_at

  def img_url
    Rails.application.routes.url_helpers.rails_blob_url(self.img, only_path: true) if self.img.attached?
  end

  private

  def left_at_after_received_at
    if received_at.present? && left_at.present? && left_at < received_at
      errors.add(:left_at, 'deve ser depois da data de recebimento')
    end
  end
end
