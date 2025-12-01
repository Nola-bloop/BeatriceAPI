import Model from require "lapis.db.model"

-- Create a model, automatically backed by the table `users`
class Users extends Model

-- fetch some rows from the table
elderly_users = Users\select "where age > ? limit 5", 10

random_user = Users\find 1233 -- find by primary key

lee = Users\find name: "Lee", email: "leemiller@example.com"

-- create a new row and edit it
user = Users\create {
  name: "Leaf"
  email: "leaf@example.com"
  age: 6
}

user\update age: 10

user\delete!