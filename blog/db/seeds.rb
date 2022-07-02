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
        email_address: "kkm2059@gmail.com",
        organisation_id: 1
    },
    {
        name: "TestAcc",
        password: "123",
        email_address: "testacc@gmail.com",
        organisation_id: 1
    },
    {
        name:"Wawa",
        password: "123",
        email_address: "wawa@gmail.com",
        organisation_id: 1
    }
])

puts "Users Created!"

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

puts "Orgs Created!"

Shift.create([
    {
        user_id: 1,
        start: "2022-06-19 13:00:00",
        finish: "2022-06-19 19:00:00",
        break_length:"20, 30"
    },
    {
        user_id: 2,
        start: "2022-06-19 19:00:00",
        finish: "2022-06-19 23:00:00",
        break_length: "10, 15"
    }
])

puts "Shifts Created!"

puts "🌱 Seeds Done! 🌱"