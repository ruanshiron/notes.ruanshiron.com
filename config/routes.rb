Rails.application.routes.draw do
  devise_for :users
  resources :notes
  resources :images, only: :create
  root "notes#index"
end
