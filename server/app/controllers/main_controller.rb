MyApp.get "/questions/1" do
  @first_question = Question.find_by_id(1)
  erb :"home"
end

MyApp.get "/answers/1" do
  @answers_to_first_question = Answer.where("question_id" => 1)
  erb :"answer_index"
end

