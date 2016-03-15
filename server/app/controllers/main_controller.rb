MyApp.get "/questions/:id" do
  @first_question = Question.find_by_id(params[:id])
  erb :"home"
end

MyApp.get "/answers/:id" do
  @answers_to_first_question = Answer.where("question_id" => (params[:id]))
  erb :"answer_index"
end

MyApp.get "/result/:id" do
  @results = [] 
  @results = Answer.where("correct" => "true")
  erb :"results"
end