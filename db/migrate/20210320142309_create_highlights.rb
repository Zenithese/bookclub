class CreateHighlights < ActiveRecord::Migration[6.0]
  def change
    create_table :highlights do |t|
      t.string :text, null: false
      t.string :cfi_range, null: false
      t.string :notes
      t.integer :user_id
      t.integer :book_id
      t.timestamps
    end
    add_index :highlights, :text
    add_index :highlights, :cfi_range
    add_index :highlights, :notes
    add_index :highlights, :user_id
    add_index :highlights, :book_id
  end
end
