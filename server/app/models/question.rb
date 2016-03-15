class Question < ActiveRecord::Base

  # Returns an ActiveRecord::Relation (collection) of Answer objects.
  def answers
    Answer.where(question_id: self.id)
  end

  # Returns a single Answer object.
  def correct_answer
    self.answers.where(correct: true).limit(1)
  end

  def determine_answer(count)
    if count == 1
      answer = Answer.where({"question_id" => self.id}).first
    elsif count == 2
      answer = Answer.where({"question_id" => self.id}).second
    elsif count == 3
      answer = Answer.where({"question_id" => self.id}).third
    elsif count == 4
      answer = Answer.where({"question_id" => self.id}).fourth
    else
      answer = nil
    end
    return answer
  end

end
