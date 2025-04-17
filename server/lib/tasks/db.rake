# ------------------------------------------------------------
# Custom Rake Task: db:reseed
#
# This task is designed for development and test environments only.
# It will **completely reset** your database by:
#   1. Dropping the database (`db:drop`)
#   2. Creating a fresh database (`db:create`)
#   3. Running all migrations (`db:migrate`)
#   4. Seeding it with data from `db/seeds.rb` (`db:seed`)
#
# Use this task when:
#   - You want to restore a clean state during local development
#   - You need to reload sample/demo data
#   - You are preparing for a team demo and want a predictable DB state
#
# Do *not* use this task in production or CI environments.
#
# Usage:
#   Run the following command from your Rails project root (/StudySync/server/):
#
#     cd StudySync/server
#     rails db:reseed
#
# ------------------------------------------------------------

namespace :db do
  desc "🔥 Drop, create, migrate, and seed the database (use for dev/demo only)"
  task reseed: :environment do
    puts "🔧 Environment: #{Rails.env.upcase}"
    puts "⚠️  This will destroy and rebuild the #{Rails.env} database"
    puts "------------------------------------------------------------"

    # Only allow reseed in development or test environments
    unless Rails.env.development? || Rails.env.test?
      puts "🚫 Reseeding is only allowed in development or test environments."
      exit 1
    end

    puts "🧨 Dropping database..."
    Rake::Task["db:drop"].invoke

    puts "📦 Creating database..."
    Rake::Task["db:create"].invoke

    puts "🧱 Running migrations..."
    Rake::Task["db:migrate"].invoke

    puts "🌱 Seeding data..."
    Rake::Task["db:seed"].invoke

    puts "✅ Done reseeding #{Rails.env} database!"
    puts "------------------------------------------------------------"
  end
end
