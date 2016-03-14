MyApp.get "/" do
  @first_question = Question.find_by_id(1)
  @first_question.save
  @answer_to_question_one = Answer.find_by_id(1)
  @answer_to_question_one.save
  erb :"home"
end