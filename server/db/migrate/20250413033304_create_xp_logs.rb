class CreateXpLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :xp_logs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :source, polymorphic: true, null: false
      t.integer :amount

      t.timestamps
    end
  end
end
