const questions = [
    { id: 1, image: 'images/question1.jpg' },
    { id: 2, image: 'images/question2.jpg' },
    // Add more questions here
];

window.onload = function() {
    const container = document.getElementById('questions-container');
    questions.forEach(question => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <img src="${question.image}" alt="Question ${question.id}">
            <input type="text" id="answer-${question.id}" placeholder="Type your answer here">
        `;
        container.appendChild(div);
    });
}

function submitAnswers() {
    const answers = questions.map(question => {
        return {
            id: question.id,
            answer: document.getElementById(`answer-${question.id}`).value
        };
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
    })
    .then(response => response.json())
    .then(data => {
        alert('Your answers have been submitted!');
    });
}
