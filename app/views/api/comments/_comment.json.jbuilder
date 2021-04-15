# json.extract! comment, :id, :commentable_type, :commentable_id, :body, :user_id, :comments

json.id comment.id
json.user_id comment.user_id
json.username comment.user.username
json.commentable_type comment.commentable_type
json.commentable_id comment.commentable_id
json.body comment.body
json.likes comment.likes_array
json.comments do 
    json.array! comment.comments, partial: "api/comments/comment", as: :comment
end