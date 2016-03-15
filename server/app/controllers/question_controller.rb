MyApp.get "/question_answer_set/:question_id" do
  @question = Question.find_by_id(params[:question_id])

  erb :"question"
end

MyApp.get "/answer_check/:question_id/:user_answer" do
  @question    = Question.find_by_id(params[:question_id])
  @user_answer = params[:user_answer]
  @corr_answer = @question.correct_answer

  erb :"answer"
end