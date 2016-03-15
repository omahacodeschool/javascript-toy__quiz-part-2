MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  @question = Question.first
  erb :"combined_question_and_answers"
end

MyApp.get "/correct_answer/:question/:user_answer" do
  @question = Question.find_by(params[:question])
  @user_answer = params[:user_answer]
    erb :"correct_answer"
  if @question.correct_answer == @user_answer
    erb :"correct_answer"
  else
    erb :"wrong_answer"
  end
end
