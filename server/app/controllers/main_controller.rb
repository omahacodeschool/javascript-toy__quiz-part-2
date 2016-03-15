MyApp.get "/1" do
  @first_question = Question.find_by_id(1)
  # @first_question.save
  # @answers_to_first_question = Answer.where("question_id" => 1)
  erb :"home"
end

