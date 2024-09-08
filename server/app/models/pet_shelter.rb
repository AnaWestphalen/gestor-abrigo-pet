# == Schema Information
#
# Table name: pet_shelters
#
#  id          :bigint           not null, primary key
#  pet_id      :bigint           not null
#  shelter_id  :bigint           not null
#  received_at :datetime
#  left_at     :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class PetShelter < ApplicationRecord
  belongs_to :pet
  belongs_to :shelter

  validates :received_at, presence: true

  validates :pet_id, uniqueness: { scope: :shelter_id, message: 'Este pet já está registrado neste abrigo' }

  # Validação para garantir que 'left_at' seja posterior a 'received_at'
  validate :left_at_after_received_at

  private

  def left_at_after_received_at
    if left_at.present? && left_at < received_at
      errors.add(:left_at, 'deve ser depois da data de recebimento')
    end
  end
end
