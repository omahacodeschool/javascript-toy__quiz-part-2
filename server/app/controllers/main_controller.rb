MyApp.get "/" do
  erb :"home"
end

MyApp.get "/question/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/question"
end

MyApp.get "/choices/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/choices"
end

MyApp.get "/correct/:id" do
  @question_object = Question.find_by_id(params[:id])
  erb :"/correct"
end

MyApp.get "/questions/amount" do
  questions = Question.all
  @question_array = []
  questions.each do |q|
    @question_array << q.id
  end
  erb :"/amount"
end