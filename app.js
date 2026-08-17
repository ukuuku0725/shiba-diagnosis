const scores = {
    refusal: 0,
    immovable: 0,
    ignore: 0,
    tsun: 0,
    emperor: 0,
    stubborn: 0,
    sniff: 0,
    guard: 0,
    hunt: 0,
    touch: 0
};

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    alert("診断を開始します！");
});

let questions = [];
let currentQuestion = 0;

fetch("./data/questions.json")
  .then(response => response.json())
  .then(data => {

    // 質問データを取得
    questions = data.questions;

    console.log("JSON読み込み成功！");
    console.log(questions);
  })

  // スタートボタン
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';

  showQuestion();
});

// 質問を表示
function showQuestion() {
  const question = questions[currentQuestion];

  document.getElementById('questionNumber').textContent =
    `Q${question.id}`;

  document.getElementById('questionText').textContent =
    question.question;

  const choicesElement = document.getElementById('choices');

  choicesElement.innerHTML = '';

  question.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;

    button.addEventListener('click', () => {
        console.log('選択した答え:', choice.text);
        console.log('得点:', choice.score);

        scores[question.category] += choice.score;

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            console.log('診断終了！');
            console.log(scores);
        }
    });

    choicesElement.appendChild(button);
    });
}
