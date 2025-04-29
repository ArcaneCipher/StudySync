# db/seeds.rb
require "faker"

puts "\u2728 Clearing existing data..."
User.destroy_all
UserSetting.destroy_all
Goal.destroy_all
Deck.destroy_all
Flashcard.destroy_all
FlashcardReview.destroy_all
StudySession.destroy_all

puts "\u2728 Creating demo users..."
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

3.times do
  users << User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    username: Faker::Internet.username,
    timezone: Faker::Address.time_zone
  )
end

puts "\u2728 Preparing subject pools..."
subject_pools = {
  biology: [
    ["What is the powerhouse of the cell?", "The mitochondria."],
    ["What carries genetic information?", "DNA."],
    ["What process turns sunlight into energy?", "Photosynthesis."],
    ["What is the basic unit of life?", "The cell."],
    ["What part of the cell contains the nucleus?", "The cytoplasm."]
  ],
  history: [
    ["Who was the first President of the USA?", "George Washington."],
    ["In what year did WW2 end?", "1945."],
    ["What empire built the Colosseum?", "The Roman Empire."],
    ["Who wrote the Declaration of Independence?", "Thomas Jefferson."],
    ["What wall fell in 1989?", "The Berlin Wall."]
  ],
  math: [
    ["What is the value of Pi approximately?", "3.1416."],
    ["What is 8 x 7?", "56."],
    ["What is the square root of 64?", "8."],
    ["Solve for x: 2x = 10", "x = 5."],
    ["What is an angle greater than 90 degrees called?", "Obtuse."]
  ],
  geography: [
    ["What is the longest river in the world?", "The Nile."],
    ["What continent is Egypt in?", "Africa."],
    ["What is the capital of Japan?", "Tokyo."],
    ["Where are the Andes mountains located?", "South America."],
    ["Which ocean is the largest?", "The Pacific Ocean."]
  ],
  physics: [
    ["Who developed the theory of relativity?", "Albert Einstein."],
    ["What force keeps us on the ground?", "Gravity."],
    ["What is the unit of electrical resistance?", "Ohm."],
    ["What is the speed of light?", "Approximately 300,000 km/s."],
    ["What device measures force?", "A spring scale."]
  ],
  chemistry: [
    ["What is H2O?", "Water."],
    ["What gas do plants absorb?", "Carbon Dioxide (CO2)."],
    ["What is the periodic table used for?", "Organizing elements."],
    ["What is NaCl?", "Salt."],
    ["What element has the atomic number 1?", "Hydrogen."]
  ],
  computer_science: [
    ["What does HTML stand for?", "HyperText Markup Language."],
    ["What is the brain of the computer?", "The CPU."],
    ["What does 'HTTP' stand for?", "HyperText Transfer Protocol."],
    ["What language is used for web styling?", "CSS."],
    ["What does API stand for?", "Application Programming Interface."]
  ],
  literature: [
    ["Who wrote 'Romeo and Juliet'?", "William Shakespeare."],
    ["What is the opposite of prose?", "Poetry."],
    ["Who is the author of '1984'?", "George Orwell."],
    ["What is a haiku?", "A 3-line poem with 5-7-5 syllables."],
    ["What genre is 'The Hobbit'?", "Fantasy."]
  ],
  art: [
    ["Who painted the Mona Lisa?", "Leonardo da Vinci."],
    ["What are the primary colors?", "Red, blue, yellow."],
    ["Who painted 'Starry Night'?", "Vincent van Gogh."],
    ["What is a sculpture made of stone called?", "A carving."],
    ["What technique uses tiny dots to form an image?", "Pointillism."]
  ],
  music: [
    ["How many notes in a musical scale?", "Seven."],
    ["What instrument has 88 keys?", "Piano."],
    ["Who composed 'Fur Elise'?", "Beethoven."],
    ["What is the symbol for a sharp note?", "#."],
    ["What does 'forte' mean in music?", "Play loudly."]
  ]
}

subjects = subject_pools.keys

decks = []

puts "\u2728 Creating decks, flashcards, and goals..."
users.each do |user|
  2.times do
    subject = subjects.sample
    deck = Deck.create!(
      user: user,
      title: Faker::Educator.course_name,
      description: "Flashcards for studying #{subject.to_s.humanize}.",
      is_public: [true, false].sample
    )

    sampled_cards = subject_pools[subject].sample(5)
    sampled_cards.each do |front, back|
      Flashcard.create!(
        deck_id: deck.id,
        front_text: front,
        back_text: back
      )
    end

    # Create 3 goals per deck
    goals = []
    goals << Goal.create!(
      user: user,
      deck_id: deck.id,
      title: "Master #{deck.title}",
      description: "Complete all sessions for #{deck.title}.",
      target_hours: 10,
      is_public: [true, false].sample
    )

    goals << Goal.create!(
      user: user,
      deck_id: deck.id,
      title: "Progress #{deck.title}",
      description: "Partial study sessions for #{deck.title}.",
      target_hours: 10,
      is_public: [true, false].sample
    )

    goals << Goal.create!(
      user: user,
      deck_id: deck.id,
      title: "Start #{deck.title}",
      description: "Start sessions for #{deck.title}.",
      target_hours: 10,
      is_public: [true, false].sample
    )

    # Seed study sessions for 2 goals
    StudySession.create!(
      user: user,
      goal: goals.first,
      duration_min: 600,
      notes: "Completed full study goal."
    )

    StudySession.create!(
      user: user,
      goal: goals.second,
      duration_min: 240,
      notes: "Partial progress made."
    )

    decks << deck
  end
end

puts "\u2728 (Optional) Creating flashcard reviews..."
Flashcard.all.each do |flashcard|
  if [true, false].sample
    FlashcardReview.create!(
      user: flashcard.deck.user,
      flashcard: flashcard,
      ease_rating: [1, 2, 3].sample,
      next_due: Date.today + rand(1..7).days,
      reviewed_at: DateTime.now
    )
  end
end

puts "\u2705 Seeding complete!"
