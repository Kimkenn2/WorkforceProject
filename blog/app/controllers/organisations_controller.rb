class OrganisationsController < ApplicationController

    def index
        orgs = Organisation.all
        render json: orgs
    end

    def create
        org = Organisation.create(orgparams)
        render json: org
    end

    def orgparams
        params.permit(:name, :hourly_rate)
    end
end
