cowsay -f ye "Dropping all tables and starting over! Seeding with seeds.rb!"
rake db:drop:all
rake db:create:all
rake db:migrate
rake db:seed
