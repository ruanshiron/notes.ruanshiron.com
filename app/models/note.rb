class Note < ApplicationRecord
  with_options presence: true do
    validates :title
    validates :body
  end

  def body_to_html
    Kramdown::Document.new(body).to_html
  end
end
