@follows.each do |follow|
    json.set! follow.id do
        json.extract! follow, :username
    end
end