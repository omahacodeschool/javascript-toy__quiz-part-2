MyApp.get "/:id" do
  @first_question = Question.find_by_id(:id)
  @first_question.save
  erb :"home"
end