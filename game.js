// ============================================
// Game Data
// ============================================

const fishData = [
    {
        image: 'images/kanood.png',
        name: 'الكنعد',
        options: ['الكنعد', 'الهامور', 'الشعري', 'القيظال']
    },
    {
        image: 'images/hamoor.png',
        name: 'الهامور',
        options: ['الكنعد', 'الهامور', 'الشعري', 'القيظال']
    },
    {
        image: 'images/shaari.png',
        name: 'الشعري',
        options: ['الكنعد', 'الهامور', 'الشعري', 'القيظال']
    },
    {
        image: 'images/qaytal.png',
        name: 'القيظال',
        options: ['الكنعد', 'الهامور', 'الشعري', 'القيظال']
    }
];

const toolData = [
    {
        image: 'images/shirshoor.png',
        name: 'الشرشور',
        options: ['الشرشور', 'القرقور']
    },
    {
        image: 'images/qarqoor.png',
        name: 'القرقور',
        options: ['الشرشور', 'القرقور']
    }
];

const protectionQuestions = [
    {
        question: 'هل يجب منع الصيد في أوقات تكاثر الأسماك؟',
        answer: true
    },
    {
        question: 'هل تقدم دولة الإمارات مساعدات مالية للصيادين؟',
        answer: true
    },
    {
        question: 'هل يمكن الصيد في أي وقت من السنة دون قيود؟',
        answer: false
    },
    {
        question: 'هل تقيم الدولة أسواق حديثة لبيع الأسماك؟',
        answer: true
    },
    {
        question: 'هل الأسماك لا تحتاج إلى حماية من الصيد الجائر؟',
        answer: false
    }
];

// ============================================
// Game State
// ============================================

let gameState = {
    score: 0,
    stage: 1,
    currentFishIndex: 0,
    currentToolIndex: 0,
    currentQuestionIndex: 0,
    answered: false,
    shuffledFishOptions: [],
    shuffledToolOptions: [],
    shuffledQuestionOptions: []
};

// ============================================
// Utility Functions
// ============================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function updateScore(points) {
    gameState.score += points;
    document.getElementById('score').textContent = gameState.score;
}

function updateStage(stage) {
    gameState.stage = stage;
    document.getElementById('stage').textContent = stage;
}

function showFeedback(elementId, message, isCorrect) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
}

function disableAllOptions(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => btn.disabled = true);
}

function enableAllOptions(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => btn.disabled = false);
}

// ============================================
// Stage 1: Fish Matching
// ============================================

function initStage1() {
    gameState.currentFishIndex = 0;
    loadFish();
}

function loadFish() {
    if (gameState.currentFishIndex >= fishData.length) {
        // Move to Stage 2
        moveToStage2();
        return;
    }

    gameState.answered = false;
    const fish = fishData[gameState.currentFishIndex];
    
    // Set image
    document.getElementById('fishImage').src = fish.image;
    
    // Shuffle and set options
    gameState.shuffledFishOptions = shuffleArray(fish.options);
    const optionButtons = document.querySelectorAll('#stage1 .option-btn');
    
    optionButtons.forEach((btn, index) => {
        btn.textContent = gameState.shuffledFishOptions[index];
        btn.className = 'option-btn';
        btn.disabled = false;
    });
    
    // Clear feedback
    document.getElementById('feedback1').textContent = '';
    document.getElementById('nextBtn1').style.display = 'none';
}

function checkFishAnswer(button) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const fish = fishData[gameState.currentFishIndex];
    const isCorrect = button.textContent === fish.name;
    
    if (isCorrect) {
        button.classList.add('correct');
        updateScore(10);
        showFeedback('feedback1', '✓ إجابة صحيحة! أحسنت!', true);
    } else {
        button.classList.add('incorrect');
        showFeedback('feedback1', `✗ إجابة خاطئة! الإجابة الصحيحة هي: ${fish.name}`, false);
        
        // Highlight correct answer
        const optionButtons = document.querySelectorAll('#stage1 .option-btn');
        optionButtons.forEach(btn => {
            if (btn.textContent === fish.name) {
                btn.classList.add('correct');
            }
        });
    }
    
    disableAllOptions('#stage1 .option-btn');
    document.getElementById('nextBtn1').style.display = 'block';
}

function nextFish() {
    gameState.currentFishIndex++;
    loadFish();
}

// ============================================
// Stage 2: Fishing Tools
// ============================================

function moveToStage2() {
    document.getElementById('stage1').style.display = 'none';
    document.getElementById('stage2').style.display = 'block';
    updateStage(2);
    initStage2();
}

function initStage2() {
    gameState.currentToolIndex = 0;
    loadTool();
}

function loadTool() {
    if (gameState.currentToolIndex >= toolData.length) {
        // Move to Stage 3
        moveToStage3();
        return;
    }

    gameState.answered = false;
    const tool = toolData[gameState.currentToolIndex];
    
    // Set image
    document.getElementById('toolImage').src = tool.image;
    
    // Shuffle and set options
    gameState.shuffledToolOptions = shuffleArray(tool.options);
    const optionButtons = document.querySelectorAll('#stage2 .option-btn');
    
    optionButtons.forEach((btn, index) => {
        btn.textContent = gameState.shuffledToolOptions[index];
        btn.className = 'option-btn';
        btn.disabled = false;
    });
    
    // Clear feedback
    document.getElementById('feedback2').textContent = '';
    document.getElementById('nextBtn2').style.display = 'none';
}

function checkToolAnswer(button) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const tool = toolData[gameState.currentToolIndex];
    const isCorrect = button.textContent === tool.name;
    
    if (isCorrect) {
        button.classList.add('correct');
        updateScore(10);
        showFeedback('feedback2', '✓ إجابة صحيحة! أحسنت!', true);
    } else {
        button.classList.add('incorrect');
        showFeedback('feedback2', `✗ إجابة خاطئة! الإجابة الصحيحة هي: ${tool.name}`, false);
        
        // Highlight correct answer
        const optionButtons = document.querySelectorAll('#stage2 .option-btn');
        optionButtons.forEach(btn => {
            if (btn.textContent === tool.name) {
                btn.classList.add('correct');
            }
        });
    }
    
    disableAllOptions('#stage2 .option-btn');
    document.getElementById('nextBtn2').style.display = 'block';
}

function nextTool() {
    gameState.currentToolIndex++;
    loadTool();
}

// ============================================
// Stage 3: Protection Questions
// ============================================

function moveToStage3() {
    document.getElementById('stage2').style.display = 'none';
    document.getElementById('stage3').style.display = 'block';
    updateStage(3);
    initStage3();
}

function initStage3() {
    gameState.currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    if (gameState.currentQuestionIndex >= protectionQuestions.length) {
        // Game Over
        endGame();
        return;
    }

    gameState.answered = false;
    const question = protectionQuestions[gameState.currentQuestionIndex];
    
    // Set question
    document.getElementById('questionText').textContent = question.question;
    
    // Enable buttons
    document.querySelectorAll('#stage3 .yes-no-btn').forEach(btn => {
        btn.disabled = false;
        btn.className = btn.classList[0]; // Reset to original class
    });
    
    // Clear feedback
    document.getElementById('feedback3').textContent = '';
    document.getElementById('nextBtn3').style.display = 'none';
}

function checkProtectionAnswer(answer) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const question = protectionQuestions[gameState.currentQuestionIndex];
    const isCorrect = answer === question.answer;
    
    if (isCorrect) {
        updateScore(10);
        showFeedback('feedback3', '✓ إجابة صحيحة! أحسنت!', true);
        if (answer) {
            document.querySelector('#stage3 .yes-btn').classList.add('correct');
        } else {
            document.querySelector('#stage3 .no-btn').classList.add('correct');
        }
    } else {
        showFeedback('feedback3', `✗ إجابة خاطئة! الإجابة الصحيحة هي: ${question.answer ? 'نعم' : 'لا'}`, false);
        if (answer) {
            document.querySelector('#stage3 .yes-btn').classList.add('incorrect');
        } else {
            document.querySelector('#stage3 .no-btn').classList.add('incorrect');
        }
        
        // Highlight correct answer
        if (question.answer) {
            document.querySelector('#stage3 .yes-btn').classList.add('correct');
        } else {
            document.querySelector('#stage3 .no-btn').classList.add('correct');
        }
    }
    
    disableAllOptions('#stage3 .yes-no-btn');
    document.getElementById('nextBtn3').style.display = 'block';
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    loadQuestion();
}

// ============================================
// Game Over
// ============================================

function endGame() {
    document.getElementById('stage3').style.display = 'none';
    document.getElementById('gameOver').style.display = 'block';
    
    // Display final score
    document.getElementById('finalScore').textContent = gameState.score;
    
    // Display message based on score
    const maxScore = (fishData.length + toolData.length + protectionQuestions.length) * 10;
    let message = '';
    
    if (gameState.score === maxScore) {
        message = '🌟 ممتاز جداً! أنت خبير في الثروة السمكية!';
    } else if (gameState.score >= maxScore * 0.8) {
        message = '⭐ رائع جداً! أنت تعرف الكثير عن الثروة السمكية!';
    } else if (gameState.score >= maxScore * 0.6) {
        message = '👍 جيد! تعلمت الكثير من المعلومات المهمة!';
    } else if (gameState.score >= maxScore * 0.4) {
        message = '📚 حسناً! يمكنك مراجعة المعلومات وتحسين أدائك!';
    } else {
        message = '💪 ابدأ من جديد! يمكنك تحقيق نتائج أفضل!';
    }
    
    document.getElementById('gameOverMessage').textContent = message;
}

function restartGame() {
    // Reset game state
    gameState = {
        score: 0,
        stage: 1,
        currentFishIndex: 0,
        currentToolIndex: 0,
        currentQuestionIndex: 0,
        answered: false,
        shuffledFishOptions: [],
        shuffledToolOptions: [],
        shuffledQuestionOptions: []
    };
    
    // Hide all stages
    document.getElementById('stage1').style.display = 'block';
    document.getElementById('stage2').style.display = 'none';
    document.getElementById('stage3').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    
    // Update display
    document.getElementById('score').textContent = '0';
    document.getElementById('stage').textContent = '1';
    
    // Start game
    initStage1();
}

// ============================================
// Initialize Game on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initStage1();
});
