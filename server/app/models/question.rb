class Question < ActiveRecord::Base

  # Returns an ActiveRecord::Relation (collection) of Answer objects.
  def answers
    Answer.where(question_id: self.id)
  end

  # Returns a single Answer object.
  def correct_answer
    self.answers.where(correct: true).limit(1)
  end
end