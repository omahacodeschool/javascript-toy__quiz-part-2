MyApp.get "/" do
  erb :"home"
end

MyApp.get "/combined_question_and_answer/:id" do
  @question = Question.find_by_id(params[:id])
  @answers = @question.answers
  @correct_answer = @question.correct_answer
  erb :"question_answer_one"
end

MyApp.get "/check_answer/:id/:answer" do 
  @question = Question.find_by_id(params[:id])
  @correct_answer = @question.correct_answer
  if @correct_answer[0].content == params[:answer]
    return "CORRECT!"
  else
    return "INCORRECT!"
  end
end

MyApp.get "/question/:id" do
  @question = Question.find_by_id(params[:id])
  return @question.content
end

MyApp.get "/choices/:id" do 
  @question = Question.find_by_id(params[:id])
  @choices = @question.answers
  erb :"choices"
end
