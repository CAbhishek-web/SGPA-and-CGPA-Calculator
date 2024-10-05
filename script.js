// Function to dynamically generate the subject input fields and credit dropdowns
function generateSubjectFields() {
    const subjectCount = document.getElementById("subjectCount").value;
    const subjectContainer = document.getElementById("subjectContainer");
    subjectContainer.innerHTML = "";  // Clear previous subjects if any

    for (let i = 1; i <= subjectCount; i++) {
        // Create a new div for each subject
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject");

        // Create a label for subject
        const subjectLabel = document.createElement("label");
        subjectLabel.textContent = `Subject ${i}: `;

        // Create an input for the grade points
        const gradeInput = document.createElement("input");
        gradeInput.type = "number";
        gradeInput.min = "0"; // Ensuring only positive values
        gradeInput.max = "10"; // Maximum allowed grade is 10
        gradeInput.step = "0.01"; // Allow decimal points up to two places
        gradeInput.placeholder = "Enter Grade Points (e.g., 10, 9.5, etc.)";
        gradeInput.classList.add("grade-input");
        gradeInput.id = `grade${i}`;

        // Create a select for the credits
        const creditSelect = document.createElement("select");
        creditSelect.id = `credit${i}`;
        const creditOptions = [1, 1.5, 2, 3];
        creditOptions.forEach(credit => {
            const option = document.createElement("option");
            option.value = credit;
            option.text = credit;
            creditSelect.appendChild(option);
        });

        // Append the label, grade input, and credit select to the div
        subjectDiv.appendChild(subjectLabel);
        subjectDiv.appendChild(gradeInput);
        subjectDiv.appendChild(creditSelect);

        // Append the div to the container
        subjectContainer.appendChild(subjectDiv);
    }

    // Show the submit button
    document.getElementById("submitBtn").style.display = "block";
}

// Function to calculate the SGPA
function calculateSGPA() {
    const subjectCount = document.getElementById("subjectCount").value;
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 1; i <= subjectCount; i++) {
        const grade = parseFloat(document.getElementById(`grade${i}`).value);
        const credit = parseFloat(document.getElementById(`credit${i}`).value);

        if (isNaN(grade) || isNaN(credit)) {
            alert(`Please enter valid grade points and credits for Subject ${i}`);
            return;
        }

        // Multiply the grade points by the credits and add to total points
        totalPoints += grade * credit;

        // Add the credits to total credits
        totalCredits += credit;
    }

    if (totalCredits === 0) {
        alert("Total credits cannot be zero.");
        return;
    }

    // Calculate the SGPA
    const sgpa = totalPoints / totalCredits;

    // Show the SGPA in the modal pop-up
    const sgpaPopupResult = document.getElementById("sgpaPopupResult");
    sgpaPopupResult.textContent = `Your SGPA is: ${sgpa.toFixed(2)}`;

    // Display the modal
    document.getElementById("sgpaModal").style.display = "flex"; // Change to flex to center it
}

// Function to close the modal
function closeModal() {
    document.getElementById("sgpaModal").style.display = "none";
}
