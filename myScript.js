const quizData = [
    {
      question: "What is the result of 2 + 2 in Python?",
      options: ["3", "4", "5", "6"],
      correct: "4",
      image: "math.png"
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "function"],
      correct: "def",
      image: "function.png"
    },
    {
      question: "What is the output of print(type([1, 2, 3]))?",
      options: ["tuple", "list", "set", "dictionary"],
      correct: "list",
      image: "list.png"
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "/*", "#", "--"],
      correct: "#",
      image: "comment.png"
    },
    {
      question: "What does the 'len()' function do in Python?",
      options: [
        "Calculates the logarithm",
        "Returns the length of a sequence",
        "Generates random numbers",
        "Converts to lowercase"
      ],
      correct: "Returns the length of a sequence",
      image: "length.png"
    }
  ];

  let current = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const imageEl = document.getElementById("image");

  function startQuiz() {
    current = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    showQuestion();
  }

  function showQuestion() {
    nextBtn.disabled = true;
    timeLeft = 15;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    const q = quizData[current];
    questionEl.textContent = q.question;
    imageEl.src = q.image;
    imageEl.style.display = "block";
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
      const btn = document.createElement("div");
      btn.classList.add("option");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(btn, option, q.correct);
      optionsEl.appendChild(btn);
    });
  }

  function updateTimer() {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoRevealAnswer();
    }
  }

  function checkAnswer(element, selected, correct) {
    clearInterval(timer);
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.style.pointerEvents = "none");

    if (selected === correct) {
      element.classList.add("correct");
      score++;
    } else {
      element.classList.add("wrong");
      allOptions.forEach(opt => {
        if (opt.textContent === correct) opt.classList.add("correct");
      });
    }

    nextBtn.disabled = false;
  }

  function autoRevealAnswer() {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => {
      opt.style.pointerEvents = "none";
      if (opt.textContent === quizData[current].correct) {
        opt.classList.add("correct");
      }
    });
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    current++;
    if (current < quizData.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  function showScore() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    timerEl.textContent = "";
    imageEl.style.display = "none";
    nextBtn.style.display = "none";
    scoreEl.innerHTML = `Your Score: ${score} / ${quizData.length}<br><br>`;

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.onclick = startQuiz;
    scoreEl.appendChild(restartBtn);
  }
