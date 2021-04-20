class CreateCommentHighlights < ActiveRecord::Migration[6.0]
  def change
    create_table :comment_highlights do |t|
      t.integer :comment_id
      t.integer :highlight_id

      t.timestamps
    end
    add_index :comment_highlights, [:comment_id, :highlight_id], unique: true
  end
end
