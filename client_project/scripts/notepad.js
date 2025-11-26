const notepadContainer = document.getElementById('notepad-container');
const notepad = document.getElementById('notepad');
const header = document.querySelector('header');
const displayButton = document.getElementById('show-notepad');
const clearButton = document.getElementById('clear-notepad');

notepad.value = localStorage.getItem('notepadContent') || '';

function updateNotepadPosition() {
    const headerHeight = header.offsetHeight;

    if (window.innerWidth <= 600) {
        notepadContainer.style.height = `300px`;
    } else {
        notepadContainer.style.height = `calc(50vh - ${headerHeight}px)`; 
    }

    notepadContainer.style.top = `${headerHeight}px`;
}


window.addEventListener('resize', updateNotepadPosition);

displayButton.addEventListener('click', (e) => {
    e.preventDefault();
    notepad.style.display = notepad.style.display === 'none' ? 'block' : 'none';
    clearButton.style.display = clearButton.style.display === 'none' ? 'inline-block': 'none';
});

clearButton.addEventListener('click', (e) => {
    notepad.value = '';
    localStorage.setItem('notepadContent', '');
});

notepad.addEventListener('input', () => {
    localStorage.setItem('notepadContent', notepad.value);
});

