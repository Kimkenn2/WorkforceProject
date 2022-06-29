class ShiftsController < ApplicationController
    def index
        shifts = Shift.all
        render json: shifts
    end
    def create
        shift = Shift.create(shiftparams)
        render json: shift
    end

    def destroy
        shift = Shift.where(user_id: params[:id])
        shift.destroy_all
    end

    def shiftparams
        params.permit(:start, :finish, :break_length, :user_id)
    end

    def destroyparams
        params.permit(:user_id)
    end
end
