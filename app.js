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

const resultTitles = [
    './images/result_1.png',
    './images/result_2.png',
    './images/result_3.png',
    './images/result_4.png',
    './images/result_5.png'
];

const medalLevels = [
    './images/medal1.png',
    './images/medal2.png',
    './images/medal3.png',
    './images/medal4.png',
    './images/medal5.png'
];

let questions = [];
let categories = [];
let currentQuestion = 0;
let totalScore = 0;

fetch("./data/questions.json")
  .then(response => response.json())
  .then(data => {

    // 質問データを取得
    questions = data.questions;
    // カテゴリを取得
    categories = data.categories

    console.log("JSON読み込み成功！");
    console.log(questions);
  })

  document.getElementById('startButton').addEventListener('click', () => {

    // スタート画面を隠す
    document.getElementById('start').style.display = 'none';

    // 診断画面を表示
    document.getElementById('quiz').style.display = 'block';

    // Q1を表示
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
            showResult();
       }
    });

    choicesElement.appendChild(button);
    });
}

function showResult() {

    // 診断画面を隠す
    document.getElementById('quiz').style.display = 'none';

    // 結果画面を表示
    document.getElementById('result').style.display = 'block';

    for (const categoryId in scores) {
        totalScore += scores[categoryId];
    }

    // 柴度を計算
    const shibaPercentage = Math.round((totalScore / 60) * 100);
    
    // 結果タイトルとコメント
    const medalLevel = document.getElementById('medalImage');
    const resultTitle = document.getElementById('resultTitle');
    let resultComment = '';
    let resultIndex = 0;

    if (shibaPercentage <= 20) {
        resultIndex = 0;
        resultComment = 'まだまだ素直！これから柴の道を極めていこう。';
    } else if (shibaPercentage <= 40) {
        resultIndex = 1;
        resultComment = '少しずつ柴らしさが顔を出してきています。';
    } else if (shibaPercentage <= 60) {
        resultIndex = 2;
        resultComment = 'なかなかの柴っぷり！飼い主さんも油断できません。';
    } else if (shibaPercentage <= 80) {
        resultIndex = 3;
        resultComment = 'かなりの柴！もう飼い主より自分の意思を優先しがち。';
    } else {
        resultIndex = 4;
        resultComment = '見事な柴っぷり！自分の道を行く、それが柴。';
    }

    medalLevel.src = medalLevels[resultIndex];
    resultTitle.src = resultTitles[resultIndex];

    // 結果をHTMLに表示
    document.getElementById('shibaPercentage').textContent =
        `生粋の柴度：${shibaPercentage}%`;

    document.getElementById('resultComment').textContent =
        resultComment;


    // カテゴリーごとの結果
    const categoryResults = document.getElementById('categoryResults');

    categoryResults.innerHTML = '';

    for (const categoryId in scores) {

        const category = categories.find(
            category => category.id === categoryId
        );

        const result = document.createElement('p');

        result.textContent =
            `${category.icon} ${category.name}：${getStars(scores[categoryId])}`;

        categoryResults.appendChild(result);
    }
}

function getStars(score) {
    if (score === 0) return '☆☆☆☆☆';
    if (score <= 1) return '★☆☆☆☆';
    if (score <= 2) return '★★☆☆☆';
    if (score <= 3) return '★★★☆☆';
    if (score <= 4) return '★★★★☆';
    return '★★★★★';
}

document.getElementById('backToTopButton').addEventListener('click', () => {

    // 結果画面を隠す
    document.getElementById('result').style.display = 'none';

    // スタート画面を表示
    document.getElementById('start').style.display = 'block';

    resetDiagnosis()

});

function resetDiagnosis() {
    currentQuestion = 0;
    totalScore = 0;

    scores.refusal = 0;
    scores.immovable = 0;
    scores.ignore = 0;
    scores.tsun = 0;
    scores.emperor = 0;
    scores.stubborn = 0;
    scores.sniff = 0;
    scores.guard = 0;
    scores.hunt = 0;
    scores.touch = 0;
}
