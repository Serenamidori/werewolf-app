class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.string :align
      t.string :action
      t.text :desc
      t.boolean :night
      t.string :image
      t.integer :points
      t.integer :max
      t.string :help

      t.timestamps null: false
    end
  end
end
