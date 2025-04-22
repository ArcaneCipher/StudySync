class CreateStudySessions < ActiveRecord::Migration[7.1]
  def change
    create_table :study_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :goal, null: false, foreign_key: true
      t.integer :duration_min
      t.text :notes

      t.timestamps
    end
  end
end