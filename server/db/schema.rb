# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_09_10_025759) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "logs", force: :cascade do |t|
    t.text "content"
    t.bigint "created_by_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_by_id"], name: "index_logs_on_created_by_id"
  end

  create_table "pet_logs", force: :cascade do |t|
    t.bigint "pet_id", null: false
    t.bigint "log_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["log_id"], name: "index_pet_logs_on_log_id"
    t.index ["pet_id"], name: "index_pet_logs_on_pet_id"
  end

  create_table "pet_shelters", force: :cascade do |t|
    t.bigint "pet_id", null: false
    t.bigint "shelter_id", null: false
    t.datetime "received_at"
    t.datetime "left_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pet_id"], name: "index_pet_shelters_on_pet_id"
    t.index ["shelter_id"], name: "index_pet_shelters_on_shelter_id"
  end

  create_table "pets", force: :cascade do |t|
    t.string "img"
    t.string "name"
    t.string "specie"
    t.string "color"
    t.string "size"
    t.string "age"
    t.string "description"
    t.string "found_in"
    t.string "tutor_name"
    t.string "tutor_contact"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shelter_logs", force: :cascade do |t|
    t.bigint "shelter_id", null: false
    t.bigint "log_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["log_id"], name: "index_shelter_logs_on_log_id"
    t.index ["shelter_id"], name: "index_shelter_logs_on_shelter_id"
  end

  create_table "shelters", force: :cascade do |t|
    t.string "img"
    t.string "name"
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.string "description"
    t.string "contact"
    t.string "accepts", default: [], array: true
    t.integer "created_by"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.string "state"
  end

  create_table "user_shelters", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "shelter_id", null: false
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shelter_id"], name: "index_user_shelters_on_shelter_id"
    t.index ["user_id"], name: "index_user_shelters_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role"
    t.string "phone"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "logs", "users", column: "created_by_id"
  add_foreign_key "pet_logs", "logs"
  add_foreign_key "pet_logs", "pets"
  add_foreign_key "pet_shelters", "pets"
  add_foreign_key "pet_shelters", "shelters"
  add_foreign_key "shelter_logs", "logs"
  add_foreign_key "shelter_logs", "shelters"
  add_foreign_key "user_shelters", "shelters"
  add_foreign_key "user_shelters", "users"
end
