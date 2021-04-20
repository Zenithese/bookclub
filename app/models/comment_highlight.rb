class CommentHighlight < ApplicationRecord
    belongs_to :comment
    belongs_to :highlight
end
