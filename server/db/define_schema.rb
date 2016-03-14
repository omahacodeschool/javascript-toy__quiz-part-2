require_relative "./_configure"

DB.define_table("questions")
DB.define_column("questions", "content", "text")

DB.define_table("answers")
DB.define_column("answers", "content", "text")
DB.define_column("answers", "question_id", "integer")
DB.define_column("answers", "correct", "boolean")