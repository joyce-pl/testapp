const button = document.getElementById('add');
const list = document.getElementById('list');
const textArea = document.getElementById('new-task');
const todo = [];

generateId = () => {
  return Date.now();
}

changeTaskState = (e) => {
  if(e.target.tagName === "LI") {
    const taskId = e.target.getAttribute('data-id');
    const task = todo.find(x => x.id == taskId);
    if(task.checked === false) {
      task.checked = true;
      e.target.querySelector('input').checked = true;
      e.target.classList.add('done');  
    } else {
      task.checked = false;
      e.target.querySelector('input').checked = false;
      e.target.classList.remove('done');
    }
  }
  if(e.target.tagName === "INPUT") {
    const taskId = e.target.parentElement.getAttribute('data-id');
    const task = todo.find(x => x.id == taskId);
    if(task.checked === false) {
      task.checked = true;
      e.target.checked = true;
      e.target.parentElement.classList.add('done');
    } else {
      task.checked = false;
      e.target.checked = false;
      e.target.parentElement.classList.remove('done');
    }
  }
  localStorage.setItem('items', JSON.stringify(todo));
};

const createLiElement = (newElement) => {
  const li = document.createElement("li");
  const box = document.createElement("input");
  box.setAttribute('type', 'checkbox');
  li.appendChild(box);
  li.setAttribute('data-id', newElement.id);
  li.appendChild(document.createTextNode(newElement.name));
  li.addEventListener('click', changeTaskState);
  list.appendChild(li);
}

const displayToDoList = () => {
  todo.forEach(element => {
    createLiElement(element);
  });
}

restoreFromLocalStorage = () => {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if(lsItems) {
    lsItems.forEach(item => todo.push(item));
  }
  displayToDoList();
}
restoreFromLocalStorage();

const addElementToList = () => {
  const text = textArea.value.trim();
  if(text.length > 0) {
    const newElement = {id: generateId(), name: text, checked: false};
    createLiElement(newElement);
    todo.push(newElement);
    localStorage.setItem('items', JSON.stringify(todo));
  }
  textArea.value = "";
}

button.addEventListener("click", () => addElementToList());
textArea.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') { 
    addElementToList();
  }
});