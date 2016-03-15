MyApp.get "/info" do
  info = Question.all
  info.each do |a|
    @q1 = a.content

  end
  @ok = Answer.all
  

  erb :"home"
end
MyApp.get "/quiz1" do
  binding.pry
  @question = Question.find_by_id(params[:place])
  @answers = Answer.where({"question_id" => params[:place]})
  erb :"quiz"
end

MyApp.get "/verify/:place" do
  question = Question.find_by_id(params[:place])
  correct = question.correct_answer
  if correct == params[:place]
    return "Correct!"
  else
    return "Nope"
  end
end

# DB.define_table("questions")
# DB.define_column("questions", "content", "text")

# DB.define_table("answers")
# DB.define_column("answers", "content", "text")
# DB.define_column("answers", "question_id", "integer")
# DB.define_column("answers", "correct", "boolean")