class AddAncestorTypeAndIdToComment < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :ancestor_type, :string
    add_column :comments, :ancestor_id, :integer
  end
end
