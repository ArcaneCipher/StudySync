class CreateFlashcardReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :flashcard_reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :flashcard, null: false, foreign_key: true
      t.integer :ease_rating
      t.date :next_due
      t.datetime :reviewed_at

      t.timestamps
    end
  end
end
