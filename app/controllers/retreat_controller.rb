# frozen_string_literal: true

class RetreatController < InertiaController
  def index
    render inertia: {}
  end

  # Украинская версия страницы ретрита: /uk
  def uk
    render inertia: 'retreat/uk'
  end
end
