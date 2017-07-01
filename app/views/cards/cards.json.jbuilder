json.products @cards do |card|
  json.name card.name
  json.align card.align
  json.icons card.icons
  json.points card.points
  json.night card.night
  json.max card.max
  json.url card.url
  json.desc card.desc
end
