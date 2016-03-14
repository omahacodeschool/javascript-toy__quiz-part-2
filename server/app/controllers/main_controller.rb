MyApp.get "/1" do
  @first_question = Question.find_by_id(1)
  
  @first_question.save
  erb :"home"
end