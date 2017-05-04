echo "Restarting the DB for Heroku..."
echo "ᕕ( ᐛ )ᕗ Dropping tables and starting over! Seeding with seeds.rb!"
heroku run rake db:drop:all
heroku run rake db:create:all
heroku run rake db:migrate
heroku run rake db:seed
