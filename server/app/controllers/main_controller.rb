MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer" do
  @question = Question.first
  erb :"combined_question_and_answers"
end
