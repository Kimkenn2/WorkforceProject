class ShiftsController < ApplicationController
    def create
        shift = Shift.create(shiftparams)
        render json: shift
    end

    def shiftparams
        params.permit(:start, :finish, :break_length, :user_id)
    end
end
