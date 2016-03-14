MyApp.get "/" do
  erb :"home"
end

MyApp.get "/question/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/question"
end

MyApp.get "/choices/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/choices"
end