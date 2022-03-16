class ImagesController < ApplicationController
  def create
    @image = Image.new(attachment: params[:file])

    if @image.save
      render :create, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end
end
