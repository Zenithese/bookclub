Book.destroy_all

Book.create!([
    {
        epub_file: "/alice.epub",
        image: "/Alice_in_Wonderland_cover.jpg",
        title: "Alice in Wonderland",
        location: "0",
        user_id: 1
    },
    {
        epub_file: "/leo-tolstoy_anna-karenina_constance-garnett.epub",
        image: "/ltak-cover.jpg",
        title: "Anna Karenina",
        location: "0",
        user_id: 1
    },
    {
        epub_file: "/mary-shelley_frankenstein.epub",
        image: "/frankenstein_image.jpg",
        title: "Frankenstein",
        location: "0",
        user_id: 1
    },
    {
        epub_file: "/charles-dickens_a-tale-of-two-cities.epub",
        image: "/2_Cities_image.jpg",
        title: "A Tale of Two Cities",
        location: "0",
        user_id: 1
    }
])
