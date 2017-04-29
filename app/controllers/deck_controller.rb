class DeckController < ApplicationController
  
  # Logic used to create a Deck object
  def standard
    
  end

  # Creates a list of wanted cards instead of allowing the moderator to input their own choices
  def custom
    
  end

  # Logic to randomize the order of cards or players
  def shuffle(deck)
    for i in 0..deck.length
      shuffleNum = rand(deck.length)
      temp = deck[i]
      deck[i] = deck[shuffleNum]
      deck[shuffleNum] = temp
    end
  end

  # Given a deck and list of players, shuffles both and matches them up
  def assign(deck, players)
    pairs = Array.new(2)
    if deck.length != players.length # Cards != Players
      puts "Oops! Something went wrong, the number of cards is not the same as the number of players!"
      return pairs # returns an empty array
    else # Cards = Players
      puts "Shuffling cards and players!"
      for i in 0..5
        shuffle(deck)
        shuffle(players)
      end
      pairs[0] = deck
      pairs[1] = players
      puts "Players and cards have been matched up!"
      return pairs # returns the shuffled arrays that line up; d[0]->p[0], d[1]->p[1] etc.
    end
  end

  # Returns the total point sum of cards
  def point_sum(deck)
    sum = 0
    # for each card in the deck
    # sum + n[points?]
    return sum
  end
end
