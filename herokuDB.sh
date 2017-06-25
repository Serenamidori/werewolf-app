echo "Restarting the DB for Heroku..."
echo "ᕕ( ᐛ )ᕗ Dropping tables and starting over! Seeding with seeds.rb!"
heroku pg:reset DATABASE --confirm werewolf-helper
heroku run rake db:migrate
heroku run rake db:seed
echo "All done!"