const button = document.getElementById('add');
const list = document.getElementById('list');
const textArea = document.getElementById('new-task');

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
};

const todo = [{id: 1, name: "to do #1", checked: false}, 
             {id: 2, name: "to do #2", checked: false}, 
             {id: 3, name: "to do #3", checked: false}];

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
displayToDoList();

const addElementToList = () => {
  const text = textArea.value.trim();
  if(text.length > 0) {
    const newElement = {id: generateId(), name: text, checked: false};
    createLiElement(newElement);
    todo.push(newElement);
  }
  textArea.value = "";
}

button.addEventListener("click", () => addElementToList());
textArea.addEventListener('keydown', (event) => {
   if (event.key === 'Enter') { 
    addElementToList();
  }
});

