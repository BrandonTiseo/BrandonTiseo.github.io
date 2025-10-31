
function validateForm() {
    const inputElements = Array.from(document.querySelectorAll('input'));
    for (let input of inputElements) {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            return false;
        }
    }
    return true;
}

function buildIntroHTML(formData){
    let coursesHTMLString = "";
    const coursesContainer = document.getElementById('courses-container');
    const courseDivs = coursesContainer.querySelectorAll('div[id^="course"]');
    const courseCount = courseDivs.length;
    
    for (let i = 1; i <= courseCount; i++) {
            if (formData[`course-id${i}`] !== undefined){
                const id = formData[`course-id${i}`];
                const name = formData[`course-name${i}`];
                const reason = formData[`course-reason${i}`];
                coursesHTMLString +=
            `
            <li>
                <b>${id}</b> - ${name}: ${reason}
            </li>`;
            }
    }
    if (coursesHTMLString === "")
        coursesHTMLString =
            `
            <li>
                <b>ITIS 3166</b> - Backend Web Development: I wanted to take backend and frontend web development in the same semester and I am very interested in web development.
            </li>
            <li>
                <b>ITSC 3688</b> - Computers & Their Impact on Society: Required course for my major.
            </li>
            <li>
                <b>ITIS 3135</b> - Frontend Web Development: I wanted to take backend and frontend web development in the same semester and I am very interested in web development.
            </li>
            <li>
                <b>ECGR 2181</b> - Logic System Design: It is a part of my computer engineering minor.
            </li>
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
`<h2>Introduction HTML</h2>
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
    <li>
        <b>Primary Computer: </b>${formData["primary-computer"]}
    </li>
    <li>
        <b>Course I'm Taking, & Why: </b>
        <ul>${coursesHTMLString}
        </ul>
    </li>
    <li>
        <b>Funny/Interesting Item to Remember me by: </b>${formData["funny"]}
    </li>
    <li>
        <b>I'd also like to Share: </b>${formData["share"]}
    </li>
</ul>
<p><q><em>${formData["quote"]}</em></q></p>
<p><em>- ${formData["quote-author"]}</em></p>
<p class="designed-by">Designed by <a href="./tiseoandco.com/">Tiseo &amp Co.</a> &copy;2025</p>`;

    return introHTMLString;
}

const generateHTMLButton = document.getElementById('generate-HTML-button');
generateHTMLButton.addEventListener('click', (e) => {
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

    output.innerHTML = '<code class="language-html"></code>';
    const codeElement = output.querySelector('code');
    codeElement.textContent = buildIntroHTML(formDataObject);

    hljs.highlightElement(codeElement);
    formElement.style.display = 'none';
    document.querySelector('main').appendChild(output);

    document.querySelector('h2').textContent = 'Introduction HTML';

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