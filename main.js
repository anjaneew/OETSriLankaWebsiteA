
// Quiz content data input

let quizData = [
    {
        question: "You are a nurse assessing a patient’s pain level. What question would you ask first?",
        options: ["Can you describe your pain?",
            "How long have you had this pain?",
            "On a scale from 1 to 10, how would you rate your pain?",
            "Have you taken any medication for the pain?"],
        correct: "On a scale from 1 to 10, how would you rate your pain?"
    },
    {
        question: "A patient is confused about their medication schedule. What is the best way to clarify?",
        options: [
            "You need to follow the instructions on the bottle.",
            "Let me explain your medication schedule in detail.",
            "It’s not that complicated; just take them as needed.",
            "Ask the pharmacist for help."
        ],
        correct: "Let me explain your medication schedule in detail."
    },
    {
        question: "During a consultation, a patient expresses fear of a diagnosis. What should you say?",
        options: [
            "Don’t worry; it's probably nothing serious.",
            "Let’s discuss your concerns and what this diagnosis means.",
            "You shouldn’t feel afraid.",
            "I understand your fear; many people feel the same."
        ],
        correct: "Let’s discuss your concerns and what this diagnosis means."
    },
    {
        question: "A caregiver reports that a patient is not eating well. What is your response?",
        options: [
            "Maybe they’re just not hungry.",
            "I’ll speak with the doctor about this.",
            "What changes have you noticed in their eating habits?",
            "You should make them eat more."
        ],
        correct: "What changes have you noticed in their eating habits?"
    },
    {
        question: "You need to explain a treatment plan to a patient. What is your approach?",
        options: [
            "Let me give you the details about the treatment.",
            "This is the treatment plan; just follow it.",
            "I will explain the treatment plan step by step.",
            "You should read the pamphlet I gave you."
        ],
        correct: "I will explain the treatment plan step by step."
    },
    {
        question: "A patient is upset about a long wait time. How do you respond?",
        options: [
            "It’s always busy here; get used to it.",
            "I understand your frustration; let me check on the delay.",
            "Please be patient; it will be your turn soon.",
            "You can complain to the manager."
        ],
        correct: "I understand your frustration; let me check on the delay."
    },
    {
        question: "When discussing lifestyle changes with a patient, what should you focus on?",
        options: [
            "You need to change everything at once.",
            "Let’s take small steps toward healthier habits.",
            "It’s not that important; you can continue your routine.",
            "You should consult a nutritionist."
        ],
        correct: "Let’s take small steps toward healthier habits."
    },
    {
        question: "A patient is hesitant to share personal information. What is your best response?",
        options: [
            "Why don’t you want to share?",
            "It’s important for your care; please tell me.",
            "I can assure you that everything is confidential.",
            "You’re making this harder than it needs to be."
        ],
        correct: "I can assure you that everything is confidential."
    },
    {
        question: "How should you handle a patient who refuses treatment?",
        options: [
            "You need to understand how serious this is.",
            "Let’s discuss your reasons for refusing.",
            "That’s your choice, but it’s unwise.",
            "You should reconsider; it’s for your health."
        ],
        correct: "Let’s discuss your reasons for refusing."
    },
    {
        question: "You notice a patient is not engaging during the conversation. What do you do?",
        options: [
            "Ask if they are paying attention.",
            "Try to involve them by asking questions.",
            "Ignore it; some people are shy.",
            "Tell them to focus."
        ],
        correct: "Try to involve them by asking questions."
    }
    ];
    
//  Adding functions with js

// HTML to JS element retrieval 

const quizContainer = document.querySelector (".quiz-container");
const question = document.querySelector (".quiz-container .question");
const options = document.querySelector (".quiz-container .options");
const nextBtn = document.querySelector (".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

//variables
let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS  = 10;

// adding shuffling

const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() -0.5);
};

quizData = shuffleArray (quizData) ;

//reset local storage 
const resetLocalStorage = () => {
    for (i = 0; i <MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();


//adding feedback mechanism
const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct){
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }
    //storing user answers
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let alloptions = document.querySelectorAll(".quiz-container .option");
    alloptions.forEach((o) => {
        o.classList.add("disabled");
    })
};


//Dynamic question generation

const createQuestion = () => {
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
        questionNumber + 1
    }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
   
    //shuffle options
    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) =>{
        const option = document.createElement ("button");
        option.classList.add ("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) =>{
            checkAnswer(e);
        });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
   questionNumber = 0;
   score = 0;
   quizData = shuffleArray(quizData);
   resetLocalStorage();

   createQuestion();
   quizResult.style.display = "none";
   quizContainer.style.display = "block";
};


//quiz result page
const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i =0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement ("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answerCorrectly =userAnswer === correctAnswer;

        if (!answerCorrectly){
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `<div class = "question"> Question ${i + 1}: ${
            quizData[i].question
        }</div>
        <div class ="user-answer">Your answer:${userAnswer || "Not Answered"}</div>
        <div class ="correct-answer">Correct answer:${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    //adding Retake button
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

createQuestion();

//adding Event listeners

const displayNextQuestion = () => {
    if (questionNumber >=MAX_QUESTIONS -1) {
        displayQuizResult();
        return;
    }
    questionNumber++;
    createQuestion();
};


nextBtn.addEventListener("click", displayNextQuestion);
