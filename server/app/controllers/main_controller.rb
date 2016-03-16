MyApp.get "/" do
  erb :"home"
end

MyApp.get "/question/:id" do 
  @question = Question.find_by_id(params[:id])
  @question.content
end 

MyApp.get "/answers/:id" do
  @answers = Answer.where({"question_id" => params[:id]})
  answers =[]
  @answers.each do |answer|
    answers << answer.content
  end
  answers.join(",")
end

MyApp.get "/correct_answer/:id" do
  question = Question.find_by_id(params[:id]) 
  question.correct_answer[0].content
end 

MyApp.get "/quiz_length" do
  questions = Question.all
  questions.count.to_s
end