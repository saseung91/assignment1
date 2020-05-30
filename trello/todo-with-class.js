const todoArray = [];
const doneArray = [];


const doneItem = (doneItem) => {
  const li = $("<li>" + doneItem + "</li>")
  $("#doneList").append(li);
}

const renderDone = () => {
  $("#doneList").empty();
  //another way of having below function
  doneArray.forEach(doneItem) // newItem function is above
}

const removeItemFromTodo = (item) => {
  // Gets the index of the element found
  const matchIndex = todoArray.findIndex((todoItem => {
    return item === todoItem;
  }))
  // Remove from the todoList array
  todoArray.splice(matchIndex, 1);
}

/******* To do items logic *************/
const onTodoItemClick = (event) => {
  console.log('event', event);
  const item = event.target.textContent;
  doneArray.push(item);
  removeItemFromTodo(item);
  // Render the todo list
  render();
  // Render done list
  renderDone();
}


const newItem = (todoItem) => {
  const li = $("<li>" + todoItem + "</li>")
  li.on('click', onTodoItemClick);
  $("#todoList").append(li);
}

const render = () => {
  $("#todoList").empty();
  //another way of having below function
  todoArray.forEach(newItem) // newItem function is above
}

const submitInfo = (event) => {
  //prevent sending infirmation to teh background and doesnt get refreshed
  event.preventDefault();
  //get each value that we enter in submit area
  const getValue = $("#toDoField").val();
  console.log("value received", getValue);
  //push entered value into the todoArray
  todoArray.push(getValue);
  console.log(todoArray);
  render();
}
// const moveTodoToDone = () => {
//     $("#doneList").append("<li>"+todoItem+"</li>")
// }

$("form").on("submit", submitInfo);