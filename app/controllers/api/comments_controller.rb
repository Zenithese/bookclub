class Api::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all.includes(:comments, :likes, :highlight)
    # @comments = Comment.all.includes(:commentable => [:comments])
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = @commentable.comments.create(comment_params)
    if @comment.save
      CommentHighlight.create!(comment_id: @comment.id, highlight_id: @comment.ancestor_id)
      set_notifications

      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.notifications.destroy_all
    recursive_delete(@comment.comments)
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:body, :user_id, :ancestor_type, :ancestor_id)
    end
end
