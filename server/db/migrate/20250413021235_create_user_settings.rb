class CreateUserSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :user_settings do |t|
      t.references :user, null: false, foreign_key: true
      t.boolean :prefers_emails
      t.integer :study_goal_min
      t.string :timezone

      t.timestamps
    end
  end
end
