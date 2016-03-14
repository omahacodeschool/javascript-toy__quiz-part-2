MyApp.get "/" do
  erb :"home"
end

MyApp.get "/add/question/:id" do
  @question = Question.find_by_id(params[:id])
  @answers = Answer.where({"question_id" => params[:id]})
  erb :"new_question"
end

MyApp.get "/is_correct/:id/:answer" do

  erb :"answer"
end


