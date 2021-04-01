json.array! @users, partial: "api/users/user", as: :user
# @users.each do |user| 
#     json.set! user.id do
#         json.partial! "api/users/user", user: user
#     end
# end
