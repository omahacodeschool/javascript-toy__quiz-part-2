MyApp.get "/questions" do
  @questions = Question.pluck(:id)
  @question_count = @questions.length
  erb :"/all_questions"
end

MyApp.get "/questions/:id" do
  @question = Question.find_by_id(params[:id])
  erb :"/question"
end

MyApp.get "/questions/:id/choices" do
  @questions = Question.pluck(:id)
  @answers = Answer.where({"question_id" => @questions.id}).pluck(:id)
  @answer = @answers.length
  erb :"/answers"
end


MyApp.get "/questions/:id/choices/:answer_id" do
  @question = Question.find_by_id(params[:id])
  input = params[:answer_id].to_i

  @answer = @question.determine_answer(input)
  erb :"/answers_for_question"
end