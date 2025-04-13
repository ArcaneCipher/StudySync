class CreateMediaUploads < ActiveRecord::Migration[7.1]
  def change
    create_table :media_uploads do |t|
      t.references :user, null: false, foreign_key: true
      t.references :flashcard, null: false, foreign_key: true
      t.string :file_url
      t.string :media_type

      t.timestamps
    end
  end
end
