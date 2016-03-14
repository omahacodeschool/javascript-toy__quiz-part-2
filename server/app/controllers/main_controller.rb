MyApp.get "/" do
  erb :"home"
end

MyApp.get "/add/question" do
  @question = Question.find_by_id(1)
  @answers = Answer.where({"question_id" => 1})
  erb :"new_question"
end

MyApp.post "/add/question_to_database" do
  #cool stuff
  add = Question.new
  add.content = params["question"]
  add.save

  redirect "/"
end

MyApp.get "/add/answers" do
  erb :"new_answer"
end

MyApp.post "/add/answer_to_database" do
  #cool stuff
  redirect "/add/answers"
end

MyApp.get "get/question" do
  erb :"new_question"
end