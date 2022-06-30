class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.datetime :start
      t.datetime :finish
      t.references :user, null: false, foreign_key: true
      t.string :break_length

      t.timestamps
    end
  end
end
