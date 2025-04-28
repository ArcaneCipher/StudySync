class AddDeckIdToGoals < ActiveRecord::Migration[7.1]
  def change
    add_reference :goals, :deck, null: false, foreign_key: true
  end
end
