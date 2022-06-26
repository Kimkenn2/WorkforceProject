class OrganisationsController < ApplicationController
    before_action :set_organisation, only: [:show, :update, :destroy]

    def index
        @orgs = Organisation.all
        render json: @orgs
    end

    def create
        org = Organisation.create(orgparams)
        render json: org
    end

    def show
        @org = Organisation.find(params[:id])
        render json: @org
    end

    def update
        @org.update(orgparams)
        render json: Organisation.all
    end

    def set_organisation
        @org = Organisation.find(params[:id])
      end

    def orgparams
        params.permit(:name, :hourly_rate)
    end
end
