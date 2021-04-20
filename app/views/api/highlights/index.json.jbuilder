# json.array! @highlights, partial: "api/highlights/highlight", as: :highlight

json.array! @highlights do |highlight|
  json.partial! "api/highlights/highlight", highlight: highlight
end