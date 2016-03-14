MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do 
  @question = Question.find_by_id(params[:id])
  @answers = Answer.where({"question_id" => params[:id]})

  erb :"question_answers"
end 