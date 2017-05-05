echo "ᕕ( ᐛ )ᕗ Launching Werewolf Helper!"
sudo service postgresql stop
sudo service postgresql start 
rails server -p $PORT -b $IP
