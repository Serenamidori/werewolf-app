echo "Restarting the DB for Heroku..."
echo "ᕕ( ᐛ )ᕗ Dropping tables and starting over! Seeding with seeds.rb!"
echo "Important! Reseting requires your input:"
heroku pg:reset DATABASE
heroku run rake db:migrate
heroku run rake db:seed
echo "All done!"