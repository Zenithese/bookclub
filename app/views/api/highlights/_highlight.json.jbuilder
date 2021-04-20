json.text highlight.text
json.id highlight.id
json.cfi_range highlight.cfi_range
json.user_id highlight.user_id
json.book_id highlight.book_id
json.comments do 
json.array! highlight.comments, partial: "api/comments/comment", as: :comment
end