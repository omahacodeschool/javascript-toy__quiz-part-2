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
  @questions = Question.find_by_id(params[:id])
  @answers = Answer.where({"question_id" => @questions.id}).pluck(:content)
  erb :"/answers_for_question"
end

MyApp.get "/questions/:id/choices/:answer" do
  @question = Question.find_by_id(params[:id])
  @user_choice = Answer.where({"question_id" => @question.id, "content" => params[:answer]}).pluck(:id)
  @correct_answer = Answer.where({"question_id" => @question.id, "correct" => true}).pluck(:id)

  if @user_choice != @correct_answer
    @user_was_correct = false
  else
    @user_was_correct = true
  end

  erb :"/validate_answer"
end