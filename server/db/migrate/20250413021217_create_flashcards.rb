class CreateFlashcards < ActiveRecord::Migration[7.1]
  def change
    create_table :flashcards do |t|
      t.references :deck, null: false, foreign_key: true
      t.text :front_text
      t.text :back_text
      t.string :image_url
      t.string :audio_url

      t.timestamps
    end
  end
end
