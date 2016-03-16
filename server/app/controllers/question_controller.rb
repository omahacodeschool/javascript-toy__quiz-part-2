MyApp.get "/question_answer_set/:question_id" do
  @question = Question.find_by_id(params[:question_id])

  erb :"question"
end

MyApp.get "/answer_check/:question_id/:user_answer" do
  @question    = Question.find_by_id(params[:question_id])
  @user_answer = params[:user_answer]
  @corr_answer = @question.correct_answer
  
  if @user_answer == @corr_answer[0].content
    erb :"correct_answer"
  else
    erb :"incorrect_answer"
  end
end