Rails.application.routes.draw do

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  
  get 'deck/build'

  get 'deck/generate'

  get 'deck/shuffle'

  get 'deck/assign'

  get 'deck/point_sum'

  get 'welcome/play'

  get 'welcome/rules'

  get 'welcome/credits'

  get "/play", to: "welcome#play", as: "play"

  get "/rules", to: "welcome#rules", as: "rules"
  
  get "/cards", to: "cards#cards", as: "cards"
  
  get "/custom", to: "deck#custom", as: "custom"
  
  get "/standard", to: "deck#standard", as: "standard"
  
  
  # get 'cards'
  resources :cards
  
  # get 'cards/details'
  resources :cards, only: [:details]
  
  # get 'cards/cards'
  resources :cards, only: [:cards]
  
  # get 'welcome/play'
  resources :welcome, only: [:play]

end
