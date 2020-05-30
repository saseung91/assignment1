const todoList = ["One", "Two", "list"];
const doneList = [];
const onTodoListClick = function (event) {
  // Get the html text from the clicked li
  const item = event.currentTarget.textContent;
  // Remove the clicked element from #todoList
  $(event.currentTarget).remove();
  // Find the clicked list item in todoList array.
  const index = todoList.findIndex(function (element) {
    return element === item;
  });
  // Remove from the todoList array
  todoList.splice(index, 1);
  // Add to the doneList
  doneList.push(item);
  // create the DOM li element
  const $li = $("<li>" + item + "</li>");
  // Add to the DOM with id doneList
  $("#doneList").append($li);
};
// I have put for loop here if in case forEach method is still confusing for some :).
for (let i = 0; i < todoList.length; i++) {
  const $li = $("<li>" + todoList[i] + "</li>");
  $li.on("click", onTodoListClick);
  $("#todoList").append($li);
}
// Watch for submit on form.
$("form").on("submit", function (event) {
  event.preventDefault();
  const inputField = $("#toDoField");
  const inputValue = inputField.val();
  console.log("value of input", inputValue);
  // As in class notes example, I am not repeating the loop, just appending the new DOM element at the end
  if (inputValue !== "") {
    todoList.push(inputValue);
    // Get the last new pushed element from the array. Wrap the new li DOM in jQuery
    const $li = $("<li>" + todoList[todoList.length - 1] + "</li>");
    // Watch for click events on before being added to the DOM.
    $li.on("click", onTodoListClick);
    // Just push it to the end of the <ul>
    $("#todoList").append($li);
    // Empty the text field
    inputField.val("");
  }
});
