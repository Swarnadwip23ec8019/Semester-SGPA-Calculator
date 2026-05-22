// 1. Attach click listeners to the semester selection buttons 🔘
document.querySelectorAll('.semester-selection button').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetSemester = parseInt(e.target.dataset.semester);
        generateForm(targetSemester);
    });
});

// 2. Function to dynamically generate the input fields 📝
function generateForm(targetSemester) {
    const formContainer = document.getElementById('dynamic-form');
    formContainer.innerHTML = ''; // Clear any previous fields

    // Loop to create past semester inputs 🔁
    for (let i = 1; i < targetSemester; i++) {
        formContainer.innerHTML += `
            <div class="sem-row">
                <h3>Semester ${i}</h3>
                <input type="number" id="sgpa-${i}" placeholder="SGPA" step="0.01" min="0" max="10">
                <input type="number" id="credit-${i}" placeholder="Credits" min="0">
            </div>
        `;
    }

    // Create target semester inputs 🎯
    formContainer.innerHTML += `
        <div class="target-row">
            <h3>Target Semester ${targetSemester}</h3>
            <input type="number" id="target-cgpa" placeholder="Expected CGPA" step="0.01" min="0" max="10">
            <input type="number" id="target-credit" placeholder="Semester ${targetSemester} Credits" min="0">
        </div>
    `;

    // Create the final calculate button and a div to show the result 🔘
    formContainer.innerHTML += `
        <button id="calculate-btn" class="calc-button">Calculate SGPA</button>
        <div id="result-display" class="result-container"></div>
    `;

    // Attach click listener to the newly created calculation button
    document.getElementById('calculate-btn').addEventListener('click', () => {
        calculateSGPA(targetSemester);
    });
}

// 3. Function to perform the mathematical calculation 🧮
function calculateSGPA(targetSemester) {
    const targetCgpa = parseFloat(document.getElementById('target-cgpa').value);
    const targetCredit = parseFloat(document.getElementById('target-credit').value);
    const resultDisplay = document.getElementById('result-display');
    
    let totalCredits = targetCredit;
    let pastTotalPoints = 0;

    // Loop through past semesters to gather data and calculate total past points 🔁
    for (let i = 1; i < targetSemester; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa-${i}`).value);
        const credit = parseFloat(document.getElementById(`credit-${i}`).value);
        
        // Add to the total credit count and calculate running point total ➕
        totalCredits += credit;
        pastTotalPoints += (sgpa * credit);
    }

    // Apply our rearranged algebraic formula 📐
    const requiredSGPA = ((targetCgpa * totalCredits) - pastTotalPoints) / targetCredit;

    // Display the final result rounded to 2 decimal places 📊
    if (isNaN(requiredSGPA) || requiredSGPA < 0 || requiredSGPA > 10) {
        resultDisplay.innerHTML = `<p class="error">Please enter valid numbers. Calculated SGPA (${requiredSGPA.toFixed(2)}) is out of range.</p>`;
    } else {
        resultDisplay.innerHTML = `<h2>Required SGPA for Sem ${targetSemester}: <span>${requiredSGPA.toFixed(2)}</span></h2>`;
    }
}