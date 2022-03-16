# frozen_string_literal: true

class ImagesController < ApplicationController
  def create
    @image = Image.new(attachment: params[:file])

    if @image.save
      render json: { url: rails_blob_url(@image.attachment) }, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end
end
