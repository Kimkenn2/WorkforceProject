class OrganistationsController < ApplicationController

    def index
        render json: Organistation.all
    end
end
