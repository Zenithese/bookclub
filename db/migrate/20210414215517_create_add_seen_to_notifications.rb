class CreateAddSeenToNotifications < ActiveRecord::Migration[6.0]
  def change
    add_column :notifications, :seen, :datetime
  end
end
