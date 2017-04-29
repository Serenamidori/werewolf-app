class WelcomeController < ApplicationController
  def index
  end
  
  def play
    @cards = Card.all 
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @cards }
    end
  end

  def rules
  end

end
