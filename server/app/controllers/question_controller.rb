MyApp.get "/question_answer_set/:id" do
  @question = Question.find_by_id(params[:id])

  erb :"question"
end