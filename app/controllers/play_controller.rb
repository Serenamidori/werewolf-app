class PlayController < ApplicationController


  def cards
    @cards = Card.all #Not sure if these need to be Card or Cards, etc
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @cards }
    end
  end

  def show
  end

end
