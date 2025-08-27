import { Block } from "payload";

export const QuizBlock: Block = {
    slug: "quiz",
    labels: {
        singular: "Quiz",
        plural: "Quizzes",
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },        
        {
            name: "questions",
            label: "Questions",
            type: "array",
            required: true,
            fields: [
                {
                    name: "question",
                    label: "Question",
                    type: "text",
                    required: true,
                },
                {
                    name: "answers",
                    label: "Answers",
                    type: "array",
                    required: true,
                    fields: [
                        {
                            name: "answers",
                            label: "Answers",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "correct",
                            label: "Correct",
                            type: "checkbox",
                        }
                    ],
                }
            ],
        }
    ]
}