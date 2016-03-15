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
  @questions = Question.find_by_id(params[:id])
  @user_choice = Answer.find_by("question_id" => @questions.id, "content" => params[:answer])
  @correct_answer = @questions.correct_answer
  
  if @user_choice.content == @correct_answer.content
    user_was_correct = true
  else
    user_was_correct = false
  end

  erb :"/validate_answer"
end