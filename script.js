(() => {
  function init() {
    const list = document.getElementById('list');
    const textArea = document.getElementById('new-task');
    const button = document.getElementById('add');
    const todos = [{ id: 1, name: "to do #1", checked: false },
    { id: 2, name: "to do #2", checked: false },
    { id: 3, name: "to do #3", checked: false }];
  }

  init();

  const generateId = () => Date.now();

  const change = (liElement, inputElement, task) => {
    if (task.checked === false) {
      task.checked = true;
      inputElement.checked = true;
      liElement.classList.add('done');
    } else {
      task.checked = false;
      inputElement.checked = false;
      liElement.classList.remove('done');
    }
  }

  const findTask = (id) => todos.find(x => x.id == id);

  changeTaskState = (e) => {
    if (e.target.tagName === "LI") {
      const taskId = e.target.getAttribute('data-id');
      const task = findTask(taskId);
      change(e.target, e.target.querySelector('input'), task);
    }
    if (e.target.tagName === "INPUT") {
      const taskId = e.target.parentElement.getAttribute('data-id');
      const task = findTask(taskId);
      console.log(e.target.checked);
      change(e.target.parentElement, e.target, task);
    }
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
    todos.forEach(todo => {
      createLiElement(todo);
    });
  }
  displayToDoList();

  const addElementToList = () => {
    const text = textArea.value.trim();
    if (text.length > 0) {
      const newElement = { id: generateId(), name: text, checked: false };
      createLiElement(newElement);
      todos.push(newElement);
    }
    textArea.value = "";
  }

  button.addEventListener("click", () => addElementToList());
  textArea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addElementToList();
    }
  });

})()