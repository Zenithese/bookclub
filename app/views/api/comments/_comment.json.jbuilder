# json.extract! comment, :id, :commentable_type, :commentable_id, :body, :user_id, :comments

json.id comment.id
json.user_id comment.user_id
json.username comment.user.username
json.avatar_id comment.user.avatar_id
json.commentable_type comment.commentable_type
json.commentable_id comment.commentable_id
json.body comment.body
# json.likes do
#     json.partial! "api/comments/likes", likes: comment.likes
# end
json.likes_count comment.likes.count
json.likes_array comment.likes_array
json.ancestor_type comment.ancestor_type
json.ancestor_id comment.ancestor_id
json.comments do 
    json.array! comment.comments, partial: "api/comments/comment", as: :comment
end