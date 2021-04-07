# json.array! @books, partial: "api/books/book", as: :book
@books.each do |book|
    json.set! book.id do
        json.extract! book, :id, :title, :location, :image, :epub_file
    end
end