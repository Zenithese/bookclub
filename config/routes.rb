Rails.application.routes.draw do
  root 'events#index'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy, :show]
    resources :books, only: [:create, :destroy, :update, :show, :index]
    resources :follows, only: [:create, :destroy]
    resources :highlights, only: [:create, :destroy, :update, :show, :index] do
      resources :comments, module: :highlights
    end
    resources :comments do
      resources :comments, module: :comments
    end
    get :highlights_search, to: 'highlights#search'
    get :books_search, to: 'books#search'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
