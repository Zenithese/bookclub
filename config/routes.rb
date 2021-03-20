Rails.application.routes.draw do
  root 'events#index'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy, :show]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
