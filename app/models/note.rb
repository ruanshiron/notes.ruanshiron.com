# frozen_string_literal: true

class Note < ApplicationRecord
  scope :recent, -> { where.not(published_on: :nil).order(published_on: :desc) }
  scope :drafts, -> { where('published_on is ?', nil).order(created_at: :desc) }

  with_options presence: true do
    validates :title
    validates :body
  end

  def body_to_html
    Kramdown::Document.new(body).to_html
  end
end
