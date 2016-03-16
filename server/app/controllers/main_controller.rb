MyApp.get "/" do
  erb :"home"
end

MyApp.get "/info/:id" do
  @question = Question.find_by_id(params[:id])
  erb :"info"
end

MyApp.get "/answer/:id" do
  @question = Question.find_by_id(params[:id])
  @answer = @question.correct_answer
  erb :"result"
end