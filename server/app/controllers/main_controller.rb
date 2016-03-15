MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  @question = Question.first
  erb :"combined_question_and_answers"
end

MyApp.get "/correct_answer/:question_id/:user_answer" do
  @question = Question.find_by_id(params[:question_id])
  @user_answer = params[:user_answer]
  @correct_answer = Answer.where("question_id" => params[:question_id], "correct" => true).first
  if @correct_answer.content == @user_answer
    erb :"correct_answer"
  else
    erb :"wrong_answer"
  end
end
