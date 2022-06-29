Rails.application.routes.draw do
  resources :shifts
  resources :organisations
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/me', to: "users#showme"
  get '/signup', to: "users#create"
  get '/organisations/:id/users', to: "organisations#orgusers"
  get '/organisations/:id/shifts', to: "organisations#orgshifts"
  post "/login", to: "sessions#create"
  post "/createshift", to: "organisations#createorgshift"
  delete "/logout", to: "sessions#destroy"
end
