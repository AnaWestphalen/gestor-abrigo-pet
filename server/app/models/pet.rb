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

  validates :name, presence: true, length: { maximum: 100 }
  validates :specie, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :found_in, presence: true, length: { maximum: 100 }

  # Validação para garantir que 'left_at' seja posterior a 'received_at'
  validate :left_at_after_received_at

  # Validação para verificar o formato base64
  validate :valid_base64_image, if: -> { img.present? }

  def img_url
    self.img if self.img.present?
  end

  private

  def left_at_after_received_at
    if received_at.present? && left_at.present? && left_at < received_at
      errors.add(:left_at, 'deve ser depois da data de recebimento')
    end
  end

  def valid_base64_image
    unless img =~ /\Adata:image\/[a-z]+;base64,/
      errors.add(:img, 'não está no formato base64 válido')
    end
  end
end
