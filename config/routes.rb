Rails.application.routes.draw do
  resources :notes
  resources :images, only: :create
  root "notes#index"
end
