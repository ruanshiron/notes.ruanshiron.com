Rails.application.routes.draw do
  devise_for :users, path: ''
  resources :notes
  resources :images, only: :create
  root 'notes#index'
end
