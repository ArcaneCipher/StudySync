# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"

puts "🌱 Clearing existing data..."
User.destroy_all
UserSetting.destroy_all
Goal.destroy_all
Deck.destroy_all
Flashcard.destroy_all
FlashcardReview.destroy_all
StudySession.destroy_all

puts "🌱 Creating demo users..."
demo_users = [
  {email: "alice@studysync.com", username: "AliceDemo"},
  {email: "bob@studysync.com", username: "BobDemo"},
  {email: "carol@studysync.com", username: "CarolDemo"}
]

users = demo_users.map do |user_data|
  User.create!(
    email: user_data[:email],
    password: "password",
    username: user_data[:username],
    timezone: "America/New_York"
  )
end

puts "🌱 Creating additional users..."
3.times do
  users << User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    username: Faker::Internet.username,
    timezone: Faker::Address.time_zone
  )
end

puts "🌱 Creating goals..."
goals = users.flat_map do |user|
  2.times.map do
    Goal.create!(
      user: user,
      title: Faker::Educator.subject,
      description: Faker::Lorem.sentence(word_count: 8),
      target_hours: rand(10..50),
      is_public: [true, false].sample
    )
  end
end

puts "🌱 Creating decks and flashcards..."
decks = users.flat_map do |user|
  2.times.map do
    deck = Deck.create!(
      user: user,
      title: Faker::Educator.course_name,
      description: Faker::Lorem.sentence(word_count: 6),
      is_public: [true, false].sample
    )

    5.times do
      Flashcard.create!(
        deck: deck,
        front_text: Faker::Lorem.question,
        back_text: Faker::Lorem.sentence(word_count: 5),
        image_url: nil,
        audio_url: nil
      )
    end

    deck
  end
end

puts "🌱 Creating study sessions..."
goals.each do |goal|
  2.times do
    StudySession.create!(
      user: goal.user,
      goal: goal,
      duration_min: rand(15..60),
      notes: Faker::Lorem.sentence(word_count: 10)
    )
  end
end

puts "✅ Seeding complete!"
