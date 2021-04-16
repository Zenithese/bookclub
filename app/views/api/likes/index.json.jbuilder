# json.array! @likes, partial: "api/likes/like", as: :like

json.set! :comments do
    @likes.where(:likeable_type => "Comment").each do |like|
        json.set! like.likeable_id do
            json.extract! like, :id
        end
    end
end
json.set! :highlights do
    @likes.where(:likeable_type => "Highlight").each do |like|
        json.set! like.likeable_id do
            json.id like.id
        end
    end
end
