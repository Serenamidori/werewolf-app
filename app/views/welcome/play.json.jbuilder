json.products @cards do |card|
  json.name card.name
  json.align card.align
  json.desc card.desc
  json.images card.images
  json.points card.points
  json.night card.night
  json.max card.max
end
