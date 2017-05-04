echo "Restarting the DB for Cloud9..."
echo "ᕕ( ᐛ )ᕗ Dropping tables and starting over! Seeding with seeds.rb!"
rake db:drop:all
rake db:create:all
rake db:migrate
rake db:seed
