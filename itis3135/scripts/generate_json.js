
function validateForm() {
    const inputElements = Array.from(document.querySelectorAll('input'));
    for (let input of inputElements) {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            return false;
        }
    }
    return true;
}

function buildJSON(formData){
    if (Object.keys(formData['picture']).length === 0){
        formData['picture'] = './images/brandon_tiseo.jpg';
    }

    let courses = [];
    const coursesContainer = document.getElementById('courses-container');
    const courseDivs = coursesContainer.querySelectorAll('div[id^="course"]');
    const courseCount = courseDivs.length;
    
    for (let i = 1; i <= courseCount; i++) {
        if (formData[`course-id${i}`] !== undefined){
            courses.push({
                id: formData[`course-id${i}`],
                name: formData[`course-name${i}`],
                reason: formData[`course-reason${i}`]
            });
            delete formData[`course-id${i}`];
            delete formData[`course-name${i}`];
            delete formData[`course-reason${i}`];
        }
    }  
    if(courses.length === 0){
        courses = [
            {
                "id": "ITIS 3166",
                "name": "Backend Web Development",
                "reason": "I wanted to take backend and frontend web development in the same semester and I am very interested in web development."
            },
            {
                "id": "ITSC 3688",
                "name": "Computers & Their Impact on Society",
                "reason": "Required course for my major."
            },
            {
                "id": "ITIS 3135",
                "name": "Frontend Web Development",
                "reason": "I wanted to take backend and frontend web development in the same semester and I am very interested in web development."
            },
            {
                "id": "ECGR 2181",
                "name": "Logic System Design",
                "reason": "It is a part of my computer engineering minor."
            },
            {
                "id": "MUPF 1113",
                "name": "Symphonic Band",
                "reason": "I am very passionate about playing an instrument and wanted to pursue playing in a band again."
            }
        ]

    }
    formData['courses']  = courses;
    return JSON.stringify(formData, null, 2);
}





const generateJSONButton = document.getElementById('generate-JSON-button');
generateJSONButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateForm()) {
        alert("Ensure every required field has an input!");
        return;
    }

    const formElement = document.getElementById('intro-form');
    const formData = new FormData(formElement);
    const formDataObject = Object.fromEntries(formData.entries());

    const output = document.createElement('pre');
    output.style.textAlign = 'left';

    output.innerHTML = '<code class="language-json"></code>';
    const codeElement = output.querySelector('code');
    codeElement.textContent = buildJSON(formDataObject);

    hljs.highlightElement(codeElement);

    formElement.style.display = 'none';
    document.querySelector('main').appendChild(output);
    document.querySelector('h2').textContent = 'Introduction JSON';

    const resubmit = document.createElement('button');
    resubmit.type='button';
    resubmit.id = 'resubmit';
    resubmit.textContent = 'Resubmit Form';
    resubmit.style.margin = '10px';
    document.querySelector('main').appendChild(resubmit);

    const resubmitButton = document.getElementById('resubmit');
    resubmitButton.addEventListener('click', () => {
        output.remove();
        resubmit.remove();
        formElement.style.display = 'block';
        formElement.reset();
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = '';
    });
});