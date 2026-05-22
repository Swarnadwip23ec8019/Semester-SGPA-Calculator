document.querySelectorAll('.semester-selection button').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetSemester = parseInt(e.target.dataset.semester);
        generateForm(targetSemester);
    });
});

function generateForm(targetSemester) {
    const formContainer = document.getElementById('dynamic-form');
    formContainer.innerHTML = '';

    for (let i = 1; i < targetSemester; i++) {
        formContainer.innerHTML += `
            <div class="sem-row">
                <h3>Semester ${i}</h3>
                <input type="number" id="sgpa-${i}" placeholder="SGPA" step="0.01" min="0" max="10">
                <input type="number" id="credit-${i}" placeholder="Credits" min="0">
            </div>
        `;
    }

    formContainer.innerHTML += `
        <div class="target-row">
            <h3>Target Semester ${targetSemester}</h3>
            <input type="number" id="target-cgpa" placeholder="Expected CGPA" step="0.01" min="0" max="10">
            <input type="number" id="target-credit" placeholder="Semester ${targetSemester} Credits" min="0">
        </div>
    `;

    formContainer.innerHTML += `
        <button id="calculate-btn" class="calc-button">Calculate SGPA</button>
        <div id="result-display" class="result-container"></div>
    `;

    document.getElementById('calculate-btn').addEventListener('click', () => {
        calculateSGPA(targetSemester);
    });
}

function calculateSGPA(targetSemester) {
    const targetCgpa = parseFloat(document.getElementById('target-cgpa').value);
    const targetCredit = parseFloat(document.getElementById('target-credit').value);
    const resultDisplay = document.getElementById('result-display');
    
    let totalCredits = targetCredit;
    let pastTotalPoints = 0;

    for (let i = 1; i < targetSemester; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa-${i}`).value);
        const credit = parseFloat(document.getElementById(`credit-${i}`).value);
        
        totalCredits += credit;
        pastTotalPoints += (sgpa * credit);
    }

    const requiredSGPA = ((targetCgpa * totalCredits) - pastTotalPoints) / targetCredit;

    if (isNaN(requiredSGPA) || requiredSGPA < 0 || requiredSGPA > 10) {
        resultDisplay.innerHTML = `<p class="error">Please enter valid numbers. Calculated SGPA (${requiredSGPA.toFixed(2)}) is out of range.</p>`;
    } else {
        resultDisplay.innerHTML = `<h2>Your SGPA for Sem ${targetSemester}: <span>${requiredSGPA.toFixed(2)}</span></h2>`;
    }
}