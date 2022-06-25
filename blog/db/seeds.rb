# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create([
    {
        name: "Kenneth",
        password: "123",
        email_address: "kkm2059@gmail.com"
    }
])

Organisation.create([
    {
        name: "Pasta's",
        hourly_rate: 10.00
    },
    {
        name: "Blake's Apple Orchard",
        hourly_rate: 9.55
    },
    {
        name: "Loger's",
        hourly_rate: 11.00
    }
])