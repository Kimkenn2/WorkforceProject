class ShiftsController < ApplicationController

    def index
        render json: Shift.all
    end
end
