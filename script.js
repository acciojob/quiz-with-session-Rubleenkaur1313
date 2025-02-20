document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('#questions > div');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');

    // Load progress from session storage
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    for (const [key, value] of Object.entries(progress)) {
        const radio = document.querySelector(`input[name="${key}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Save progress to session storage
    questions.forEach(question => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                progress[input.name] = input.value;
                sessionStorage.setItem('progress', JSON.stringify(progress));
            });
