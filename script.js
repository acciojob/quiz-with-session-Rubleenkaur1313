const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        answer: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    }
];

const questionsContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

// Load questions and previous selections
function loadQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        q.options.forEach((option, i) => {
            const checked = sessionStorage.getItem(`question${index}`) == i ? 'checked' : '';
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}" ${checked}>
                    ${option}
                </label><br>
            `;
        });
        
        questionsContainer.appendChild(questionDiv);
    });
}

// Save progress to session storage
function saveProgress() {
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            sessionStorage.setItem(`question${index}`, selectedOption.value);
        } else {
            sessionStorage.removeItem(`question${index}`);
        }
    });
}

// Calculate score and store in local storage
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = sessionStorage.getItem(`question${index}`);
        if (selectedOption && parseInt(selectedOption) === q.answer) {
            score++;
        }
    });
    localStorage.setItem('score', score);
    return score;
}

// Display score
function displayScore(score) {
    scoreDisplay.innerText = `Your score is ${score} out of 5.`;
}

// Event listeners
submitButton.addEventListener('click', () => {
    saveProgress();
    const score = calculateScore();
    displayScore(score);
});

// Load quiz on page load
loadQuiz();
