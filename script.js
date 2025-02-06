// Questions and answers
const questions = [
    { text: "Hiii Honeyy!!! 💕", answers: ["Hiii !!!!"] },
    { text: "I’m glad you took the time off your day to open this website :DDD", answers: ["Of course !!!"] },
    { text: "As you know, there’s a specific day coming up!", answers: ["Mhmm !!!"] },
    { text: "And you, being the one that I love most, I just want to ask you something very important!", answers: ["What is it :ooo"] },
    { text: "Will you Be My Valentine? 💖", answers: ["Yes 😍", "No 😔"], special: true },
    { text: "YIPPEEEEE!!! 🎉 I made a special gift for you!", answers: ["🎁 Open Your Gift! 🎁"], link: "YOUR_LINK_HERE" }
];

let currentQuestion = 0;
let noButtonPressCount = 0;

function nextQuestion(index) {
    if (index >= questions.length) return; // Stop if we run out of questions

    currentQuestion = index;
    let questionContainer = document.getElementById("question-container");
    let questionElement = document.getElementById("question");
    let optionsContainer = document.getElementById("options");

    // Clear previous content
    questionElement.innerHTML = "";
    optionsContainer.innerHTML = "";

    // Check if the current question is the "Will you be my valentine?" question
    if (questions[index].text === "Will you Be My Valentine? 💖") {
        let catImage = new Image();
        catImage.src = 'cat.gif';
        catImage.alt = 'Cat';
        catImage.style.display = 'block';
        catImage.style.margin = '0 auto 20px';
        questionElement.appendChild(catImage);
    }

    // Set the question text
    questionElement.innerHTML += questions[index].text;

    // Create buttons for the answers
    questions[index].answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;

        // Special handling for the Valentine question
        if (questions[index].special) {
            button.onclick = answer === "Yes 😍" ? () => selectOption("yes") : () => selectOption("no");
        } 
        // Redirect to a special gift if it's the final question
        else if (questions[index].link) {
            button.onclick = () => window.location.href = questions[index].link;
        } 
        // Otherwise, go to the next question
        else {
            button.onclick = () => nextQuestion(index + 1);
        }

        optionsContainer.appendChild(button);
    });
}


// Handles "Will You Be My Valentine?" responses
function selectOption(option) {
    let questionDiv = document.getElementById('question-container');
    let yesButton = document.querySelector("#options button:first-child");
    let noButton = document.querySelector("#options button:last-child");

    if (option === 'yes') {
        flashRainbowColors(() => {
            questionDiv.style.display = 'none';
            displayCatHeart();
            nextQuestion(5);
        });
    } else if (option === 'no') {
        noButtonPressCount++;
        
        // Increase font size of the "Yes" button
        let currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        let newSize = parseFloat(currentFontSize) * 1.2;
        yesButton.style.fontSize = newSize + 'px';

        // Change "No" button text progressively
        let noTexts = [
            'You sure?', 'Really sure?', 'Absolutely sure?', 'Legit ba?', 'Bakit?', 'Ano ba?', 
            'Ano trip mo?', 'Mag yes ka na kasi', 'Makulit ka ah', 'Pag nag yes ka may regalo ka sakin', 
            '....', 'ANO BA BAT AYAW MO!?!@@)_*#!', 'Sige na one time lang', 'PLEAAAAASSEEE NA', 
            'PLEAAAAASSEEEWKASKDF'
        ];

        noButton.innerText = noTexts[Math.min(noButtonPressCount, noTexts.length - 1)];
        moveButtonToRandomPosition(noButton);
    }
}

// Flash rainbow effect when "Yes" is selected
function flashRainbowColors(callback) {
    let colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    let i = 0;
    let interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '#FADADD';
        callback();
    }, 2000);
}

// Display a cute cat-heart gif when "Yes" is selected
function displayCatHeart() {
    document.getElementById('image-container').innerHTML = '';
    let imageContainer = document.getElementById('image-container');
    let catHeartImage = new Image();
    catHeartImage.src = 'cat-heart.gif'; 
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = () => {
        imageContainer.appendChild(catHeartImage);
        document.getElementById('question-container').style.display = 'block';
        displayFinalQuestion();
    };
}

// Display the final question with the gift link
function displayFinalQuestion() {
    let finalQuestion = questions[5];
    document.getElementById("question").innerText = finalQuestion.text;
    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous buttons

    finalQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => window.location.href = finalQuestion.link;
        optionsContainer.appendChild(button);
    });
}

// Move the "No" button randomly to make it hard to press
function moveButtonToRandomPosition(button) {
    let maxX = window.innerWidth - button.clientWidth - 50;
    let maxY = window.innerHeight - button.clientHeight - 50;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

// Initialize the first question
nextQuestion(0);
