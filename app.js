const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
let score = 0;

const jeopardyCategories = [
  {
    genre: "Literature",
    questions: [
      {
        question: "Who wrote the Harry Potter saga?",
        answers: ["JK Rowling", "Oscar Wilde"],
        correct: "JK Rowling",
        level: "easy",
      },
      {
        question: "Who dies at the end of the first Lord Of The Rings Book?",
        answers: ["Boromir", "Aragorn"],
        correct: "Boromir",
        level: "medium",
      },
      {
        question: "Who trained Achilles?",
        answers: ["Philoctetes", "Chiron"],
        correct: "Chiron",
        level: "hard",
      },
    ],
  },
  {
    genre: "Geography",
    questions: [
      {
        question: "Where is Surinam located?",
        answers: ["In South America", "In the Middle East"],
        correct: "In South America",
        level: "easy",
      },
      {
        question: "What is the capital of Australia",
        answers: ["Canberra", "Sydney"],
        correct: "Canberra",
        level: "medium",
      },
      {
        question: "Where is Chichén Itzá",
        answers: ["Mexico", "Peru"],
        correct: "Mexico",
        level: "hard",
      },
    ],
  },
  {
    genre: "Mathematics",
    questions: [
      {
        question:
          "How many sides of equal length are in an isosceles triangle?",
        answers: ["2", "3"],
        correct: "2",
        level: "easy",
      },
      {
        question: "What is a reciprocal?",
        answers: ["The inverse of a number", "An infinite spiral"],
        correct: "The inverse of a number",
        level: "medium",
      },
      {
        question: "The square root of 65 is a rational number",
        answers: ["True", "False"],
        correct: "False",
        level: "hard",
      },
    ],
  },
  {
    genre: "Anime",
    questions: [
      {
        question: "How many kids does goku have?",
        answers: ["1", "2"],
        correct: "2",
        level: "easy",
      },
      {
        question: "How many tailed beasts are there in Naruto?",
        answers: ["9", "10"],
        correct: "10",
        level: "medium",
      },
      {
        question: "Which is the most powerful titan of SNK?",
        answers: ["Founding Titan", "War Hammer Titan"],
        correct: "Founding Titan",
        level: "hard",
      },
    ],
  },
];

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerHTML = category.genre;

  column.append(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (question.level == "easy") {
      card.innerHTML = 100;
    } else if (question.level == "medium") {
      card.innerHTML = 200;
    } else {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-answer-1", question.answers[0]);
    card.setAttribute("data-answer-2", question.answers[1]);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());
    card.addEventListener("click", flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "15px";
  this.style.lineHeight = "30px";
  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  const firstButton = document.createElement("button");
  const secondButton = document.createElement("button");
  firstButton.classList.add("first-button");
  secondButton.classList.add("second-button");
  firstButton.innerHTML = this.getAttribute("data-answer-1");
  secondButton.innerHTML = this.getAttribute("data-answer-2");
  firstButton.addEventListener("click", getResult);
  secondButton.addEventListener("click", getResult);
  this.append(textDisplay, firstButton, secondButton);
  textDisplay.innerHTML = this.getAttribute("data-question");

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement;

  if (cardOfButton.getAttribute("data-correct") == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", flipCard);
}
