class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.date :published_on, index: true

      t.timestamps
    end
  end
end
