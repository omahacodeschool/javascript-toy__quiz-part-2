class Question < ActiveRecord::Base

  # Returns an ActiveRecord::Relation (collection) of Answer objects.
  def answers
    Answer.where(question_id: self.id)
  end

  # Returns a single Answer object.
  def correct_answer
    self.answers.where(correct: true).limit(1)
  end
  #what if there were an array of question, answers, correct answer ALL AT ONCE
  def all_the_stuff_array
    all_the_stuff_array = []
    all_the_stuff_array[0] = self.content
    just_questions_array = []
    just_questions_array
    self.answers.each do |a| 
      just_questions_array << a.content
    end
    all_the_stuff_array[1] = just_questions_array
    return all_the_stuff_array
  end
end