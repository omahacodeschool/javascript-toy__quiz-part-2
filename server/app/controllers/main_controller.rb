MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  @question = Question.find_by_id(params[:id])
  @answers = @question.answers
  @correct_answer = @question.correct_answer
  erb :"question_answer_one"
end