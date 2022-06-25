class OrganisationsController < ApplicationController

    def index
        orgs = Organisation.all
        render json: orgs
    end
end
