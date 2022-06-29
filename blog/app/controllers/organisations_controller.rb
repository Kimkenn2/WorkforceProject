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

    def orgusers
        orgusers = Organisation.find(params[:id]).users
        render json: orgusers
    end

    def orgshifts
        orgshifts = Organisation.find(params[:id]).shifts
        render json: orgshifts
    end

    def createorgshift
        shift = Shift.create(orgshiftparams)
        render json: shift
        # render json: Organisation.find(id: (User.where(id: shift.user_id)).organisation_id).shifts
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

    def orgshiftparams
        params.permit(:start, :finish, :break_length, :user_id)
    end
end
