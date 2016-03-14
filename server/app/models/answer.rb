class Answer < ActiveRecord::Base

  # Returns a single Question object.
  def question
    Question.find_by_id(self.question_id)
  end
end