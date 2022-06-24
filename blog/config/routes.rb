Rails.application.routes.draw do
  resources :users
  resources :organistations
  resources :shifts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/me', to: "users#showme"
  get '/signup', to: "users#create"
end
