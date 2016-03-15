MyApp.get "/" do
  erb :"home"
end

MyApp.get "/get/question/:id" do
  question = Question.find_by_id(params[:id])
  answers = Answer.where({"question_id" => params[:id]})
  question.content
end
MyApp.get "/get/answers/:id" do
  answers = Answer.where({"question_id" => params[:id]})
  possbile_answers = ""
  answers.each do |x|
   possbile_answers.insert(-1, x.content+". ")
 end
 possbile_answers
end

MyApp.get "/is_correct/:id/:answer" do
  question = Question.find_by_id(params[:id])
  correct_answer = question.correct_answer
  if correct_answer[0].content == params[:answer]
    return "That is correct."
  else
    return "WRONG!"
  end
end


