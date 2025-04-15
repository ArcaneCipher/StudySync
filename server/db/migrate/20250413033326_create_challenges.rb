class CreateChallenges < ActiveRecord::Migration[7.1]
  def change
    create_table :challenges do |t|
      t.string :name
      t.text :description
      t.string :type
      t.integer :xp_reward

      t.timestamps
    end
  end
end
