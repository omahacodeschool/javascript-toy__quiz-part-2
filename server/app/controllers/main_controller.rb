MyApp.get "/" do
  @question = Question.find_by_id(1)
  @answer = Answer.where({question_id: 1})
  erb :"home"
end

Myapp.post "/answer" do
  #some data comes in with form
  #check to see if data matches answer in database
  #assign boolean to varialbe
  #erb response page should have if true send this if false send that  
end