# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Limpa os dados existentes para evitar conflitos de duplicação
User.destroy_all
Shelter.destroy_all
Pet.destroy_all

# Seed para o model User
users = User.create!([
  { email: 'maria@example.com', password: '123456', role: 'gestor', phone: '123456789' },
  { email: 'joão@example.com', password: '123456', role: 'voluntário', phone: '987654321' },
  { email: 'ana@example.com', password: '123456', role: 'gestor', phone: '987654321' },
  { email: 'josé@example.com', password: '123456', role: 'voluntário', phone: '987654321' }
])

# Seed para o model Shelter
shelters = Shelter.create!([
  {
    img: 'shelter1.jpg',
    name: 'Abrigo A',
    address: 'Rua 1',
    city: 'São Paulo',
    state: 'SP',
    latitude: -23.5505,
    longitude: -46.6333,
    description: 'Abrigo para cachorros',
    contact: '11987654321',
    accepts: %w(cachorro gato),
    created_by: users.first.id
  },
  {
    img: 'shelter2.jpg',
    name: 'Abrigo B',
    address: 'Rua 2',
    city: 'São Paulo',
    state: 'SP',
    latitude: -23.5506,
    longitude: -46.6334,
    description: 'Abrigo para gatos',
    contact: '11987654322',
    accepts: ['gato'],
    created_by: users.first.id
  }
])

# Seed para o model Pet (anexando imagens)
pets = Pet.create!([
  {
    name: 'Rex',
    specie: 'cachorro',
    color: 'marrom',
    size: 'grande',
    age: '2 anos',
    description: 'Cão dócil encontrado na rua',
    found_in: 'Parque Marinha',
    tutor_name: 'Maria',
    tutor_contact: '11987654333',
    received_at: 2.days.ago,
    left_at: nil,
    shelter_id: shelters.first.id
  },
  {
    name: 'Mia',
    specie: 'gato',
    color: 'preto',
    size: 'pequeno',
    age: '1 ano',
    description: 'Gato tímido',
    found_in: 'Avenida Goethe',
    tutor_name: 'João',
    tutor_contact: '11987654334',
    received_at: 1.week.ago,
    left_at: nil,
    shelter_id: shelters.second.id
  }
])

# Anexando as imagens aos pets
pets.first.img.attach(io: File.open(Rails.root.join('db/seed_images/pet1.jpg')), filename: 'pet1.jpg')
pets.second.img.attach(io: File.open(Rails.root.join('db/seed_images/pet2.jpg')), filename: 'pet2.jpg')

# Seed para o model Log
logs = Log.create!([
  { content: 'Registro de evento para o abrigo A', created_by: users.first },
  { content: 'Registro de evento para o abrigo B', created_by: users.second }
])

# Seed para o model ShelterLog (associação entre Shelter e Log)
ShelterLog.create!([
  { shelter_id: shelters.first.id, log_id: logs.first.id },
  { shelter_id: shelters.second.id, log_id: logs.second.id }
])

# Seed para o model PetLog (associação entre Pet e Log)
PetLog.create!([
  { pet_id: pets.first.id, log_id: logs.first.id },
  { pet_id: pets.second.id, log_id: logs.second.id }
])

# Seed para o model UserShelter (associação entre User e Shelter)
UserShelter.create!([
  { user_id: 1, shelter_id: shelters.first.id, role: 'admin' },
  { user_id: 2, shelter_id: shelters.first.id, role: 'voluntário' },
  { user_id: 3, shelter_id: shelters.second.id, role: 'admin' },
  { user_id: 4, shelter_id: shelters.second.id, role: 'voluntário' }
])

puts 'Seeds completed successfully!'
