# db/seeds.rb
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

3.times do
  users << User.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    username: Faker::Internet.username,
    timezone: Faker::Address.time_zone
  )
end

puts "🌱 Preparing subject pools..."
subject_pool = [
  {
    subject: "Biology",
    deck: {
      title: "Intro to Biology",
      flashcards: [
        ["What is the powerhouse of the cell?", "The mitochondria."],
        ["What carries genetic information?", "DNA."],
        ["What process turns sunlight into energy?", "Photosynthesis."],
        ["What is the basic unit of life?", "The cell."],
        ["What part of the cell contains the nucleus?", "The cytoplasm."]
      ]
    },
    goals: [
      {title: "Master Cell Biology", description: "Complete all study sessions covering cell structures and functions."},
      {title: "Photosynthesis Practice", description: "Review materials focused on energy conversion in plants."},
      {title: "Genetics Kickoff", description: "Start learning about DNA and inheritance."}
    ]
  },
  {
    subject: "History",
    deck: {
      title: "World History Fundamentals",
      flashcards: [
        ["Who was the first President of the USA?", "George Washington."],
        ["In what year did WW2 end?", "1945."],
        ["What empire built the Colosseum?", "The Roman Empire."],
        ["Who wrote the Declaration of Independence?", "Thomas Jefferson."],
        ["What wall fell in 1989?", "The Berlin Wall."]
      ]
    },
    goals: [
      {title: "Complete Ancient to Modern Timeline", description: "Finish reviewing key global events from 1000 BCE to present."},
      {title: "Partial Modern History Review", description: "Focus on WW2 and Cold War content."},
      {title: "Start American Revolution Module", description: "Begin studying US independence and early leadership."}
    ]
  },
  {
    subject: "Mathematics",
    deck: {
      title: "Basic Algebra & Geometry",
      flashcards: [
        ["What is the value of Pi approximately?", "3.1416."],
        ["What is 8 x 7?", "56."],
        ["What is the square root of 64?", "8."],
        ["Solve for x: 2x = 10", "x = 5."],
        ["What is an angle greater than 90 degrees called?", "Obtuse."]
      ]
    },
    goals: [
      {title: "Complete Algebra Set", description: "Master algebraic expressions and equations."},
      {title: "Progress in Geometry Concepts", description: "Cover shapes, angles, and basic theorems."},
      {title: "Start Number Theory Basics", description: "Begin practicing operations and number properties."}
    ]
  },
  {
    subject: "Geography",
    deck: {
      title: "Global Geography Essentials",
      flashcards: [
        ["What is the longest river in the world?", "The Nile."],
        ["What continent is Egypt in?", "Africa."],
        ["What is the capital of Japan?", "Tokyo."],
        ["Where are the Andes mountains located?", "South America."],
        ["Which ocean is the largest?", "The Pacific Ocean."]
      ]
    },
    goals: [
      {title: "Complete Physical Geography", description: "Finish learning about continents, rivers, and landforms."},
      {title: "Partial Map Practice", description: "Continue memorizing world capitals and boundaries."},
      {title: "Start Regional Studies", description: "Begin review of Asia and South America."}
    ]
  },
  {
    subject: "Physics",
    deck: {
      title: "Introductory Physics",
      flashcards: [
        ["Who developed the theory of relativity?", "Albert Einstein."],
        ["What force keeps us on the ground?", "Gravity."],
        ["What is the unit of electrical resistance?", "Ohm."],
        ["What is the speed of light?", "Approximately 300,000 km/s."],
        ["What device measures force?", "A spring scale."]
      ]
    },
    goals: [
      {title: "Master Mechanics Module", description: "Study Newton's laws and motion principles."},
      {title: "Review Electricity Basics", description: "Practice formulas and concepts around current and resistance."},
      {title: "Start Light & Optics", description: "Begin learning wave properties and light speed."}
    ]
  },
  {
    subject: "Chemistry",
    deck: {
      title: "General Chemistry Concepts",
      flashcards: [
        ["What is H2O?", "Water."],
        ["What gas do plants absorb?", "Carbon Dioxide (CO2)."],
        ["What is the periodic table used for?", "Organizing elements."],
        ["What is NaCl?", "Salt."],
        ["What element has the atomic number 1?", "Hydrogen."]
      ]
    },
    goals: [
      {title: "Complete Chemical Bonds Review", description: "Focus on ionic, covalent, and metallic bonding."},
      {title: "Practice Atomic Structure", description: "Learn about protons, neutrons, and electrons."},
      {title: "Start Periodic Table Study", description: "Begin identifying groups and periodic trends."}
    ]
  },
  {
    subject: "Computer Science",
    deck: {
      title: "CS Basics for Beginners",
      flashcards: [
        ["What does HTML stand for?", "HyperText Markup Language."],
        ["What is the brain of the computer?", "The CPU."],
        ["What does 'HTTP' stand for?", "HyperText Transfer Protocol."],
        ["What language is used for web styling?", "CSS."],
        ["What does API stand for?", "Application Programming Interface."]
      ]
    },
    goals: [
      {title: "Complete Internet Foundations", description: "Review protocols, networking, and web tech."},
      {title: "Continue Programming Basics", description: "Cover variables, loops, and conditionals."},
      {title: "Start Software Systems Study", description: "Learn about compilers, operating systems, and APIs."}
    ]
  },
  {
    subject: "Literature",
    deck: {
      title: "Literary Foundations",
      flashcards: [
        ["Who wrote 'Romeo and Juliet'?", "William Shakespeare."],
        ["What is the opposite of prose?", "Poetry."],
        ["Who is the author of '1984'?", "George Orwell."],
        ["What is a haiku?", "A 3-line poem with 5-7-5 syllables."],
        ["What genre is 'The Hobbit'?", "Fantasy."]
      ]
    },
    goals: [
      {title: "Finish Literary Terms Module", description: "Define major forms, styles, and devices."},
      {title: "Analyze Shakespeare", description: "Read and break down key passages from his works."},
      {title: "Start Novel Study", description: "Begin reading and journaling on selected novels."}
    ]
  },
  {
    subject: "Art",
    deck: {
      title: "Introduction to Art History",
      flashcards: [
        ["Who painted the Mona Lisa?", "Leonardo da Vinci."],
        ["What are the primary colors?", "Red, blue, yellow."],
        ["Who painted 'Starry Night'?", "Vincent van Gogh."],
        ["What is a sculpture made of stone called?", "A carving."],
        ["What technique uses tiny dots to form an image?", "Pointillism."]
      ]
    },
    goals: [
      {title: "Complete Renaissance Review", description: "Study famous works and artists from the Renaissance."},
      {title: "Practice Color Theory", description: "Learn about primary, secondary, and tertiary colors."},
      {title: "Start Art Techniques Overview", description: "Begin identifying styles and mediums."}
    ]
  },
  {
    subject: "Music",
    deck: {
      title: "Fundamentals of Music Theory",
      flashcards: [
        ["How many notes in a musical scale?", "Seven."],
        ["What instrument has 88 keys?", "Piano."],
        ["Who composed 'Fur Elise'?", "Beethoven."],
        ["What is the symbol for a sharp note?", "#."],
        ["What does 'forte' mean in music?", "Play loudly."]
      ]
    },
    goals: [
      {title: "Complete Scales and Keys", description: "Master major and minor scales."},
      {title: "Practice Rhythm Notation", description: "Review note durations and time signatures."},
      {title: "Start Classical Composer Study", description: "Begin learning about key historical figures in music."}
    ]
  }
]

puts "🌱 Creating decks, flashcards, goals, and sessions..."
users.each do |user|
  2.times do
    subject = subject_pool.sample
    deck = Deck.create!(
      user: user,
      title: subject[:deck][:title],
      description: "Flashcards for studying #{subject[:subject]}.",
      is_public: [true, false].sample
    )

    subject[:deck][:flashcards].each do |front, back|
      Flashcard.create!(deck_id: deck.id, front_text: front, back_text: back)
    end

    goals = subject[:goals].map do |goal_data|
      Goal.create!(
        user: user,
        deck_id: deck.id,
        title: goal_data[:title],
        description: goal_data[:description],
        target_hours: 10,
        is_public: [true, false].sample
      )
    end

    StudySession.create!(
      user: user,
      goal: goals[0],
      duration_min: 600,
      notes: "Completed full study goal."
    )

    StudySession.create!(
      user: user,
      goal: goals[1],
      duration_min: 240,
      notes: "Partial progress made."
    )
  end
end

puts "🌱 Seeding flashcard reviews..."
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

puts "✅ Seeding complete!"
