const button = document.getElementById('add');
const list = document.getElementById('list');
const textArea = document.getElementById('new-task');

function generateId() {
  const id = new Date();
  return id.getTime();
}

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
  todo.forEach(function(element) {
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
textArea.addEventListener('keydown', function() {
   if (event.keyCode === 13) { 
    addElementToList();
  }
});

function changeTaskState(e) {
  if(e.target.tagName === "LI") {
    const taskId = e.target.getAttribute('data-id');
    const task = todo.find(x => x.id == taskId);
    if(task.checked === false) {
      task.checked = true;
      e.target.querySelector('input').setAttribute('checked', true);
      e.target.classList.add('done');  
    } else {
      task.checked = false;
      e.target.querySelector('input').removeAttribute('checked');
      e.target.classList.remove('done');
    }
  }
  if(e.target.tagName === "INPUT") {
    const taskId = e.target.parentElement.getAttribute('data-id');
    const task = todo.find(x => x.id == taskId);
    if(task.checked === false) {
      task.checked = true;
      e.target.setAttribute('checked', true);
      e.target.parentElement.classList.add('done');
    } else {
      task.checked = false;
      e.target.removeAttribute('checked');
      e.target.parentElement.classList.remove('done');
    }
  }
};