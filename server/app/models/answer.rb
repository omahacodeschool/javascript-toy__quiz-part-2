# DB.define_column("answers", "content", "text")
# DB.define_column("answers", "question_id", "integer")
# DB.define_column("answers", "correct", "boolean")

class Answer < ActiveRecord::Base

  # Returns a single Question object.
  def question
    Question.find_by_id(self.question_id)
  end
end