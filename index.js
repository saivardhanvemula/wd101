const dobError = document.getElementById('dobError');
const dobInput = document.getElementById("dob");
const userDataTable = document.getElementById("user-data");
const userDataTableBody = userDataTable.getElementById("tbody");
const registrationForm = document.getElementById("registration-form");

window.addEventListener("load", () => {
    updateUserDataTable();
});
function validateUserData(userData) {
    const today = new Date();
    const birth = new Date(userData.dob);
    const age = today.getFullYear - birth.getFullYear();
    if (age < 18 || age > 55) {
        return false;
    } else {
        return true;
    }
}
function saveUserData(userData) {
    const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
    existingUserData.push(userData);
    localStorage.setItem('userList', JSON.stringify(existingUserData));
}
function clearForm() {
    registrationForm.reset();
}
function updateUserDataTable() {
    userDataTableBody.innerHTML = '';
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList.forEach((userData) => {
        const userDataRow = createUserDataTableRow(userData);
        userDataTableBody.appendChild(userDataRow);
    });
    if (userList.length > 0) {
        userDataTable.classList.remove('hidden');
    } else {
        userDataTable.classList.add('hidden');
    }
}
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email'), value,
        passwword: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        terms: document.getElementById('terms').checked
    };
    if (!validateUserData(userData)) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'age must be between 18 and 55 '
        errorMessage.classList.add('error-mesasge');
        const dateField = document.getElementById('dob');
        dateField.parentNode.appendChild(errorMessage);
    } else {
        saveUserData(userData);
        updateUserDataTable();
        clearForm();
    }
})
function createUserDataTableRow(userData) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${userData.name}</td>
    <td>${userData.email}</td>
    <td>${userData.passwword}</td>
    <td>${userData.dob}</td>
    <td>${userData.terms ? 'true' : 'false'}</td>
    `;
    return row;
}