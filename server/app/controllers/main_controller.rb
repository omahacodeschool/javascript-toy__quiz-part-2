MyApp.get "/questions" do
  @questions = Question.pluck(:id)
  @question_count = @questions.length
  erb :"/all_questions"
end

MyApp.get "/questions/:id" do
  @question = Question.find_by_id(params[:id])
  @answers = @question.answers
  erb :"/home"
end