class AddDeckIdToGoals < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :deck_id, :integer
    add_foreign_key :goals, :decks
  end
end
