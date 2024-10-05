// Function to dynamically generate the semester input fields
function generateSemesterFields() {
    const semesterCount = document.getElementById("semesterCount").value;
    const semesterContainer = document.getElementById("semesterContainer");
    semesterContainer.innerHTML = "";  // Clear previous semesters if any

    for (let i = 1; i <= semesterCount; i++) {
        // Create a new div for each semester
        const semesterDiv = document.createElement("div");
        semesterDiv.classList.add("semester");

        // Create a label for semester
        const semesterLabel = document.createElement("label");
        semesterLabel.textContent = `Semester ${i}: `;

        // Create an input for SGPA
        const sgpaInput = document.createElement("input");
        sgpaInput.type = "number";
        sgpaInput.min = "0"; // Ensuring only positive values
        sgpaInput.step = "0.01"; // Allow decimal points
        sgpaInput.placeholder = "Enter SGPA (e.g., 10, 9.5, etc.)";
        sgpaInput.classList.add("sgpa-input");
        sgpaInput.id = `sgpa${i}`;

        // Create an input for total credits
        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.min = "0"; // Ensuring only positive values
        creditInput.placeholder = "Total Credits";
        creditInput.classList.add("credit-input");
        creditInput.id = `credits${i}`;

        // Append the label, SGPA input, and credit input to the div
        semesterDiv.appendChild(semesterLabel);
        semesterDiv.appendChild(sgpaInput);
        semesterDiv.appendChild(creditInput);

        // Append the div to the container
        semesterContainer.appendChild(semesterDiv);
    }

    // Show the submit button
    document.getElementById("submitBtn").style.display = "block";
}

// Function to calculate the CGPA
function calculateCGPA() {
    const semesterCount = document.getElementById("semesterCount").value;
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 1; i <= semesterCount; i++) {
        const sgpa = parseFloat(document.getElementById(`sgpa${i}`).value);
        const credits = parseFloat(document.getElementById(`credits${i}`).value);

        if (isNaN(sgpa) || isNaN(credits)) {
            alert(`Please enter valid SGPA and total credits for Semester ${i}`);
            return;
        }

        // Multiply the SGPA by the total credits and add to total points
        totalPoints += sgpa * credits;

        // Add the credits to total credits
        totalCredits += credits;
    }

    if (totalCredits === 0) {
        alert("Total credits cannot be zero.");
        return;
    }

    // Calculate the CGPA
    const cgpa = totalPoints / totalCredits;

    // Show the CGPA in the modal pop-up
    const cgpaPopupResult = document.getElementById("cgpaPopupResult");
    cgpaPopupResult.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;

    // Display the modal
    document.getElementById("cgpaModal").style.display = "flex"; // Change to flex to center it
}

// Function to close the modal
function closeModal() {
    document.getElementById("cgpaModal").style.display = "none";
}
