# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# Seed para o model User
users = User.create!([
  { email: 'admin@example.com', password: 'password', role: 'gestor', phone: '123456789' },
  { email: 'user1@example.com', password: 'password', role: 'voluntário', phone: '987654321' }
])

# Seed para o model Shelter
shelters = Shelter.create!([
  {
    img: 'shelter1.jpg',
    name: 'Abrigo A',
    address: 'Rua 1',
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
    latitude: -23.5506,
    longitude: -46.6334,
    description: 'Abrigo para gatos',
    contact: '11987654322',
    accepts: ['gato'],
    created_by: users.second.id
  }
])

# Seed para o model Pet
pets = Pet.create!([
  {
    img: 'pet1.jpg',
    name: 'Rex',
    specie: 'cachorro',
    color: 'marrom',
    size: 'grande',
    age: '2 anos',
    description: 'Cão dócil encontrado na rua',
    found_in: 'Parque Marinha',
    tutor_name: 'Maria',
    tutor_contact: '11987654333'
  },
  {
    img: 'pet2.jpg',
    name: 'Mia',
    specie: 'gato',
    color: 'preto',
    size: 'pequeno',
    age: '1 ano',
    description: 'Gato tímido',
    found_in: 'Avenida Goethe',
    tutor_name: 'João',
    tutor_contact: '11987654334' }
])

# Seed para o model PetShelter (associação entre Pet e Shelter)
PetShelter.create!([
  { pet_id: pets.first.id, shelter_id: shelters.first.id, received_at: DateTime.now - 10.days, left_at: nil },
  { pet_id: pets.second.id, shelter_id: shelters.second.id, received_at: DateTime.now - 5.days, left_at: nil }
])

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
  { user_id: users.first.id, shelter_id: shelters.first.id, role: 'admin' },
  { user_id: users.second.id, shelter_id: shelters.second.id, role: 'voluntário' }
])

puts 'Seeds completed successfully!'
