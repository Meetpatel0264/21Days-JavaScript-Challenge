const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const qNo = document.getElementById("qNo");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");

const loader = document.getElementById("loader");
const quizBox = document.getElementById("quizBox");

let quiz = [];
let current = 0;
let score = 0;
let selected = null;
let time = 300;

async function loadQuiz() {
    try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
        const data = await res.json();

        quiz = data.results.map(q => {
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * 4);
            options.splice(correctIndex, 0, q.correct_answer);

            return {
                question: decodeHTML(q.question),
                options: options.map(decodeHTML),
                correct: correctIndex
            };
        });

        loader.style.display = "none";
        quizBox.classList.remove("hidden");

        loadQuestion();
    } catch (err) {
        loader.innerText = "Failed to load questions 😢";
    }
}

function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function loadQuestion() {
    const data = quiz[current];

    qNo.textContent = `${current + 1} / ${quiz.length}`;
    questionEl.textContent = data.question;
    optionsEl.innerHTML = "";

    data.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;

        div.onclick = () => selectOption(i, div);

        optionsEl.appendChild(div);
    });
}

function selectOption(i, el) {
    selected = i;

    document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
    el.classList.add("active");
}

nextBtn.onclick = () => {
    if (selected === null) return alert("Select option");

    if (selected === quiz[current].correct) score++;

    scoreEl.textContent = score;

    current++;
    selected = null;

    if (current < quiz.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
};

function endQuiz() {
    quizBox.innerHTML = `
        <h2>🎉 Quiz Completed</h2>
        <p>Your Score: ${score}/${quiz.length}</p>
    `;
}

setInterval(() => {
    time--;
    let m = Math.floor(time / 60);
    let s = time % 60;

    timerEl.textContent = `${m}:${s < 10 ? "0" + s : s}`;

    if (time <= 0) endQuiz();
}, 1000);

loadQuiz();