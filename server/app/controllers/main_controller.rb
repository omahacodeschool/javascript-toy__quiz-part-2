MyApp.get "/" do
  erb :"home"
end

MyApp.get "/info" do
  @question = Question.find_by_id(1)
  @question.correct_answer
  erb :"info"
end

MyApp.get "/new" do
  erb :"new"
end

MyApp.post "/newquestion" do
  question = Question.new
  question.content = params["content"]
  question.save
  #true answer saved as "true"  
  answer = Answer.new
  answer.content = params["true_answer"]
  answer.question_id = question.id
  answer.correct = true
  answer.save
  #false answers saved as "false"
  answer2 = Answer.new
  answer2.content = params["false_answer1"]
  answer2.question_id = question.id
  answer2.correct = false
  answer2.save
  #
  answer3 = Answer.new
  answer3.content = params["false_answer2"]
  answer3.question_id = question.id
  answer3.correct = false
  answer3.save
  #
  answer4 = Answer.new
  answer4.content = params["false_answer3"]
  answer4.question_id = question.id
  answer4.correct = false
  answer4.save
  #
  redirect "/"
end