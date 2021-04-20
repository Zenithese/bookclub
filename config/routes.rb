Rails.application.routes.draw do
  root 'events#index'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :books, only: [:create, :destroy, :update, :show, :index]
    resources :follows, only: [:index, :create, :destroy]
    resources :readings, only: [:create, :destroy]
    resources :likes, only: [:index, :destroy]
    resources :highlights, only: [:create, :destroy, :update, :show, :index] do
      resources :comments, module: :highlights
      resources :likes, module: :highlights
    end
    resources :comments do
      resources :comments, module: :comments
      resources :likes, module: :comments
    end
    resources :notifications, only: [:index, :update] do
      collection do
        post :mark_as_seen
        get :not_seen
      end
    end
    get :highlights_search, to: 'highlights#search'
    get :books_search, to: 'books#search'
    get :user_books, to: 'books#readings'
    get :user_follows, to: 'users#follows'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
