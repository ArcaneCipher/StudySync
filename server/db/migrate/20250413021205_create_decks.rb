class CreateDecks < ActiveRecord::Migration[7.1]
  def change
    create_table :decks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.boolean :is_public

      t.timestamps
    end
  end
end
