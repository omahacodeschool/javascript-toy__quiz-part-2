MyApp.get "/first_question_and_answer_set" do
  @question = Question.first
  erb :"questions/question_and_answer_set"
end