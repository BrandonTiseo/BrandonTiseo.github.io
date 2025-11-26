const formElement = document.getElementById('quote-form');
emailjs.init('hWtl5xw-bDgwEYGZy');

let spinner;

function loadSpinner(){
    spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.id = "quote-spinner";
    document.querySelector('main').appendChild(spinner);
}

function hideSpinner(){
    spinner = document.querySelector('.spinner');
    if (spinner) spinner.remove();
}

function displayResult(res){
    const main = document.querySelector('main');
    const result = document.createElement("h1");
    result.innerText = res === "success" ? "Email Submitted Successfully!" : "Email Failed to Submit!";
    result.style.color = res === "success" ? "var(--green)" : "var(--red)";
    main.appendChild(result);
    setTimeout(() => {
        result.remove();
    },2000);
}


formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    formElement.style.display = "none";
    loadSpinner();

    const formData = new FormData(formElement);

    const checkbox = document.getElementById('notes');
    const notesContent = (checkbox.checked) ? localStorage.getItem('notepadContent') : '';
    formData.append('notes', notesContent);
    
    const formObject = Object.fromEntries(formData.entries());

    emailjs.send('service_f0de6ne', 'template_mrnfl89', formObject)
        .then(() => {
            hideSpinner();
            displayResult("success");
            setTimeout(() => {
                formElement.reset(); 
                formElement.style.display = "flex";
            }, 1000);

        })
        .catch(() => {
            hideSpinner();
            displayResult("fail");
            setTimeout(() => {
                formElement.style.display = "flex";
            }, 1000);
        });
});