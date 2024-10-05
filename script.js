document.addEventListener("DOMContentLoaded", () => {
    const questions = {
        physics: [
            { question: "A 90.0-kg fullback running east with a speed of 5.00 m/s is tackled by a 95.0-kg opponent running north with a speed of 3.00 m/s. If the collision is perfectly inelastic, calculate the speed and direction of the players just after the tackle.", answer: "Final speed ≈ 3.88 m/s at 33.69° north of east." },
            { question: "A billiard ball moving at 5.00 m/s strikes a stationary ball of the same mass. Find the struck ball’s velocity after the collision.", answer: "Final velocity ≈ 4.00 m/s at 60.0°." },
        ],
        food: [
            { question: "What is the most expensive spice in the world?", answer: "Saffron is the most expensive spice." },
            { question: "Which fruit has its seeds on the outside?", answer: "The strawberry has its seeds on the outside." },
        ],
        fantasy: [
            { question: "What is the name of the wizarding school in Harry Potter?", answer: "Hogwarts School of Witchcraft and Wizardry." },
            { question: "What mythical creature is known for having the body of a horse and the wings of a bird?", answer: "The Pegasus is a winged horse." },
        ],
        random: [
            { question: "What is the hardest natural substance on Earth?", answer: "Diamond is the hardest natural substance." },
            { question: "What is the capital city of Australia?", answer: "Canberra is the capital city of Australia." },
        ]
    };

    let questionCount = 0; // Tracks how many questions have been generated
    const maxQuestions = 10; // Maximum number of questions allowed

    const generatedQuestionDiv = document.getElementById("generated-question");
    const generateButton = document.getElementById("generate-question");
    const revealButton = document.getElementById("reveal-answer");
    const answerModal = document.getElementById("answer-modal");
    const answerText = document.getElementById("answer-text");
    const closeButtons = document.querySelectorAll(".close-button");
    const questionDisplay = document.getElementById("question-display");
    const progressIndicator = document.getElementById("progress-indicator");
    const signInButton = document.getElementById("sign-in-up");
    const signInModal = document.getElementById("signin-modal");

    function getRandomQuestion(subject) {
        const subjectQuestions = questions[subject];
        if (!subjectQuestions || subjectQuestions.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
        return subjectQuestions[randomIndex];
    }

    function updateProgress() {
        progressIndicator.textContent = `Progress: ${questionCount}/${maxQuestions}`;
        const percentage = (questionCount / maxQuestions) * 100;
        progressIndicator.textContent += ` (${percentage.toFixed(0)}%)`;
        
        if (questionCount >= maxQuestions) {
            progressIndicator.textContent += " - You've reached the maximum number of questions!";
            generateButton.disabled = true; // Disable further question generation
            signInButton.classList.remove("hidden"); // Show sign-in/up button
        } else {
            signInButton.classList.add("hidden"); // Hide sign-in/up button
        }
    }

    generateButton.addEventListener("click", () => {
        if (questionCount >= maxQuestions) return;

        const selectedSubject = document.getElementById("subject").value;
        const randomQuestion = getRandomQuestion(selectedSubject);
        
        if (!randomQuestion) {
            generatedQuestionDiv.textContent = "No questions available for this subject.";
            return;
        }

        const { question, answer } = randomQuestion;
        generatedQuestionDiv.textContent = question;
        generatedQuestionDiv.dataset.answer = answer;

        answerText.textContent = '';
        revealButton.classList.remove("hidden");
        questionDisplay.classList.remove("hidden");
        answerModal.classList.add("hidden");

        questionCount++;
        updateProgress();
    });

    revealButton.addEventListener("click", () => {
        const answer = generatedQuestionDiv.dataset.answer;
        answerText.textContent = answer;
        answerModal.classList.remove("hidden");
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            answerModal.classList.add("hidden");
            signInModal.classList.add("hidden"); // Close sign-in modal if open
        });
    });

    signInButton.addEventListener("click", () => {
        signInModal.classList.remove("hidden");
    });

    // Prevent page refresh from resetting progress
    const savedProgress = localStorage.getItem('questionCount');
    if (savedProgress) {
        questionCount = parseInt(savedProgress);
        updateProgress();
    }

    window.addEventListener("beforeunload", () => {
        localStorage.setItem('questionCount', questionCount);
    });

    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // Add login logic here (this can be expanded later)
        alert("Logged in!");
        signInModal.classList.add("hidden");
    });
});
