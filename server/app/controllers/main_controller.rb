MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  @question = Question.first
  erb :"questions/question_and_answer_set"
end