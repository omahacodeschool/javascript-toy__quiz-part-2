MyApp.get "/" do
  erb :"home"
end

MyApp.get "/question_and_choices/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/question_and_choices"
end