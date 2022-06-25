Rails.application.routes.draw do
  resources :organisations
  resources :users
  resources :shifts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/me', to: "users#showme"
  get '/signup', to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
