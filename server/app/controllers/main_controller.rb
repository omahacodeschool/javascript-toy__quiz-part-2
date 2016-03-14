MyApp.get "/" do
  erb :"home"
end

MyApp.get "/question/:id" do 
  @question = Question.find_by_id(params[:id])
  erb :"question"
end 

MyApp.get "/answers/:id" do
  @answers = Answer.where({"question_id" => params[:id]})
  erb :"answers"
end