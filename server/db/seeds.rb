if Question.count == 0

  q1 = Question.create(content: "What is an example of a collection in Ruby?")
  Answer.create([
    {question_id: q1.id, content: "String", correct: false},
    {question_id: q1.id, content: "Array", correct: true},
    {question_id: q1.id, content: "Object", correct: false},
    {question_id: q1.id, content: "Integer", correct: false}
  ])

  q2 = Question.create(content: "What are 'hashes' called in JavaScript?")
  Answer.create([
    {question_id: q2.id, content: "Objects", correct: true},
    {question_id: q2.id, content: "Dictionaries", correct: false},
    {question_id: q2.id, content: "Arrays", correct: false},
    {question_id: q2.id, content: "Tuples", correct: false}
  ])

  q3 = Question.create(content: "What do we call the programmable representation of a Web document?")
  Answer.create([
    {question_id: q3.id, content: "The DOM", correct: true},
    {question_id: q3.id, content: "HTML", correct: false},
    {question_id: q3.id, content: "Events", correct: false},
    {question_id: q3.id, content: "XHR", correct: false}
  ])

  q4 = Question.create(content: "The 'initialize' method in Ruby is an implementation of the _____________ pattern.")
  Answer.create([
    {question_id: q4.id, content: "Class", correct: false},
    {question_id: q4.id, content: "Instance", correct: false},
    {question_id: q4.id, content: "Object", correct: false},
    {question_id: q4.id, content: "Constructor", correct: true}
  ])

else
  puts "Skipping seeding, because there is already content in the database."
end