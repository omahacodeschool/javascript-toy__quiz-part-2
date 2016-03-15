MyApp.get "/" do
  erb :"home"
end

MyApp.get "/info" do
  @question = Question.find_by_id(1)
  erb :"info"
end

MyApp.get "/answer" do
  @question = Question.find_by_id(1)
  erb :"result"
end