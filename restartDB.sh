echo "Restarting the DB for Cloud9..."
echo "ᕕ( ᐛ )ᕗ Dropping tables and starting over! Seeding with seeds.rb!"
echo "Restarting postgresql"
sudo service postgresql stop
sudo service postgresql start 
dropdb cards
echo "Dropped DB 'cards'"
createdb cards
echo "Created DB 'cards'"
rake db:migrate
rake db:seed
echo "All done!"
