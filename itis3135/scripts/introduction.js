let courseCounter = 0;

function validateForm() {
    const inputElements = Array.from(document.querySelectorAll('input'));
    for (let input of inputElements) {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            return false;
        }
    }
    return true;
}

function addCourseDeleteButton(newCourse) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.id = `${newCourse.id}-delete`;
    deleteButton.innerText = 'Delete Course';
    deleteButton.addEventListener('click', () => {
        newCourse.remove();
    });
    newCourse.appendChild(deleteButton);
    return newCourse;
}

function addCourse(){
    courseCounter+=1;
    const coursesContainer = document.getElementById('courses-container');
    const newCourse = document.createElement('div');
    newCourse.id = `course${courseCounter}`;

    const inputHTMLString = `
                            <label for="course-id${courseCounter}">Course abbreviation and ID</label>
                            <input type="text" name="course-id${courseCounter}" value="ITIS 3135" placeholder="abbr ####" required>
                            <label for="course-name${courseCounter}">Course name</label>
                            <input type="text" name="course-name${courseCounter}" value="Frontend Web Development" placeholder="Your course's name" required>
                            <label for="course-reason${courseCounter}">Reason for taking the course:</label>
                            <input type="text" name="course-reason${courseCounter}" value="Wanted to take backend and frontend web development in the same semester and I am very interested in web development." placeholder="Your reasoning for taking the course" required>
                            `;
    newCourse.innerHTML = inputHTMLString;
    addCourseDeleteButton(newCourse);
    coursesContainer.appendChild(newCourse);
}

function buildIntroHTML(formData){
    let coursesHTMLString = "";
    for (let i = 1; i <= courseCounter; i++) {
            if (formData[`course-id${i}`] !== undefined){
                const id = formData[`course-id${i}`];
                const name = formData[`course-name${i}`];
                const reason = formData[`course-reason${i}`];
                coursesHTMLString += `<li><b>${id}</b> - ${name}: ${reason}</li>`;
            }
    }
    if (coursesHTMLString === "")
        coursesHTMLString = `<li>
                        <b>ITIS 3166</b> - Backend Web Development: I wanted to take backend and frontend web development in the same semester and I am very interested in web development.
                    </li>
                    <li><b>ITSC 3688</b> - Computers & Their Impact on Society: Required course for my major.</li>
                    <li>
                        <b>ITIS 3135</b> - Frontend Web Development: I wanted to take backend and frontend web development in the same semester and I am very interested in web development.
                    </li>
                    <li><b>ECGR 2181</b> - Logic System Design: It is a part of my computer engineering minor.</li>
                    <li>
                        <b>MUPF 1113</b> - Symphonic Band: I am very passionate about playing an instrument and wanted to pursue playing in a band again.
                    </li>`;

    const imageFile = document.getElementById('picture').files[0];
    let imageUrl = '';
    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    } else {
        imageUrl = './images/brandon_tiseo.jpg';
    }
    
    const introHTMLString = 
    `   
        <h3>${formData["first-name"]} ${formData["nickname"]} ${formData["middle-name"]} ${formData["last-name"]} ${formData["divider"]} ${formData["mascot-adj"]} ${formData["mascot-animal"]}</h3>
        <figure>
            <img src="${imageUrl}" alt="A photo of ${formData["first-name"]} ${formData["last-name"]}">
            <figcaption><i>${formData["picture-caption"]}</i></figcaption>
        </figure>
        <p>${formData["personal-statement"]}</p>
        <ul>
            <li>
                <b>Personal Background: </b>
                ${formData["personal-background"]}
            </li>
            <li>
                <b>Professional Background: </b>
                ${formData["professional-background"]}
            </li>
            <li>
                <b>Academic Background: </b>
                ${formData["academic-background"]}
            </li>
            <li>
                <b>Background in Frontend Web Development: </b>
                ${formData["frontend-background"]}
            </li>
            <li><b>Primary Computer: </b>${formData["primary-computer"]}</li>
            <li>
                <b>Course I'm Taking, & Why: </b>
                <ul>
                    ${coursesHTMLString}
                </ul>
            </li>
            <li><b>Funny/Interesting Item to Remember me by: </b>${formData["funny"]}</li>
            <li><b>I'd also like to Share: </b>${formData["share"]}</li>
        </ul>
        <p><q><em>${formData["quote"]}</em></q></p>
        <p><em>- ${formData["quote-author"]}</em></p>
        <button type="button" id="resubmit">Submit Form Again</button> 
        <nav>
            <a href="${formData["clt-website"]}">CLT website</a> 
            ${formData["divider"]}
            <a href="${formData["github"]}">GitHub</a> 
            ${formData["divider"]}
            <a href="${formData["freecodecamp"]}">FreeCodeCamp</a>
            ${formData["divider"]}
            <a href="${formData["codecademy"]}">Codecadamy</a>
            ${formData["divider"]}
            <a href="${formData["linkedin"]}">LinkedIn</a> 
        </nav>
        <p class="designed-by">Designed by <a href="./tiseoandco.com/">Tiseo &amp Co.</a> &copy;2025</p>
        `;
    return introHTMLString;
}

const addCourseButton = document.getElementById('add-course');
addCourseButton.addEventListener('click', () => addCourse());

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function () {
    const inputElements = Array.from(document.querySelectorAll('input'));
    inputElements.forEach((input) => (input.value = ''));
});

const formElement = document.getElementById('intro-form');
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
        alert("Ensure every required field has an input!");
        return;
    }

    const formData = new FormData(formElement);
    const formDataObject = Object.fromEntries(formData.entries());

    const introSection = document.createElement('section');
    introSection.innerHTML = buildIntroHTML(formDataObject);
    introSection.style.margin = 0;

    formElement.style.display = 'none';
    document.querySelector('footer').style.display = 'none';

    document.querySelector('main').appendChild(introSection);

    const resubmitButton = document.getElementById('resubmit');
    resubmitButton.addEventListener('click', () => {
        introSection.remove();
        formElement.style.display = 'block';
        document.querySelector('footer').style.display = 'block';
        formElement.reset();
        courseCounter = 0;
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = '';
    });
});