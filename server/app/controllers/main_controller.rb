MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id/:score" do
  @score = params[:score]
  if Question.find_by_id(params[:id]) != nil
    @question = Question.find_by_id(params[:id])
    erb :"combined_question_and_answers"
  else
    redirect "/score/#{@score}"
  end
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

MyApp.get "/score/:score" do
  @score = params[:score]
  @total = Question.all.length
  erb :"score"
end

MyApp.get "/question/:question_id/:score" do
   @question = Question.find_by_id(params[:question_id])
  erb :"question"
end

MyApp.get "/answer1/:question_id" do
 @question = Question.find_by_id(params[:question_id])
  erb :"radiobutton1"
end