class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :location, null: false
      t.string :image
      t.integer :user_id
      t.string :epub_file, null: false

      t.timestamps
    end
    add_index :books, :title, unique: true
    add_index :books, :user_id
  end
end
