MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  if Question.find_by_id(params[:id]) != nil
    @question = Question.find_by_id(params[:id])
    erb :"combined_question_and_answers"
  else
    redirect "/score"
  end
end

MyApp.get "/correct_answer/:question_id/:user_answer" do
    @question = Question.find_by_id(params[:question_id])
    @user_answer = params[:user_answer]
    @correct_answer = Answer.where("question_id" => params[:question_id], "correct" => true).first
    @score = 0
    @total = Question.all.length
    if @correct_answer.content == @user_answer
      @score += 1
      erb :"correct_answer"
    else
      erb :"wrong_answer"
    end
end
