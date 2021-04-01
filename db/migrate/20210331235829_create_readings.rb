class CreateReadings < ActiveRecord::Migration[6.0]
  def change
    create_table :readings do |t|
      t.integer :user_id, null: false
      t.integer :book_id, null: false

      t.timestamps
    end
    add_index :readings, [:user_id, :book_id], unique: true
  end
end
