
let listItems = [
    // {
    //     title: "type in a name for a card",
    //     status: 0
    // }
]
const lists = [
    // {
    //     title: "todo"

    // },
    // {
    //     title: "done"
    // }
]

function addItemtoDom(event) {
    event.preventDefault();
    const colnumber = event.currentTarget.dataset.colnumber;
    const inputField = $(`#addCard${colnumber}`);
    const inputValue = inputField.val();
    const newItem = {};
    const uniqueId = Date.now();
    console.log("value of input", inputValue);
    $(`.jumbotron[data-col=${colnumber}] .items`).append(
        `<div class="row item" data-id=${uniqueId}>
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${inputValue}
                    <button type="button" data-column=${colnumber} class="btn btn-danger remove" data-id=${uniqueId}>x</button></h5>
                </div>
            </div>
        </div>
      </div > `)
    $(".remove").on("click", function (event) {
        const uniqueId = parseInt(event.currentTarget.dataset.id);
        $(`.item[data-id=${uniqueId}]`).remove();
        console.log("button clicked");
        event.preventDefault();
        const colnumber = parseInt(event.currentTarget.dataset.colnumber);
        const filteredItems = listItems.filter(function (item) {
            if (item.id !== uniqueId) {
                return true;
            }
        })
        console.log("filteredItems", filteredItems);
        listItems = filteredItems;
    })
    newItem.title = inputValue;
    newItem.status = Number(colnumber);
    newItem.id = uniqueId;
    listItems.push(newItem);
    console.log(listItems);
}

lists.forEach(function (list, index) {
    const filteredItems = listItems.filter(function (item) {
        if (item.status == index) {
            return true;
        }
    })
    console.log('filtered items', filteredItems);
    let itemDom = '';
    filteredItems.forEach(function (item) {
        itemDom +=
            `<div class="row">
                        <div class="col">
                        <div class="card">
                            <div class="card-body">
                              <h5 class= "card-title" data-itemnumber=${index}>${item.title}</h5> 
                              <p class="card-text"></p>
                              <p class="card-text"><small class="text-muted"></small></p>
                            </div>
                          </div>
                          </div>
                          </div>`
    })
    $("#items").append(
        `<div class="jumbotron" data-col=${index}>
            <h4>${list.title}</h4>
            <div class="items">${itemDom}</div>
        <div class="input-group mb-3">
        <input type="text" id="addCard${index}" class="form-control" placeholder="Add another card" aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary add-item" type="button" id="button-addon2" data-colnumber=${index}>Add card</button>
        </div>
      </div>
      </div>`
    )
}
)

//create a new card
$(".add-item").on("click", function (event) {
    addItemtoDom(event);
})

//adding columns
$("#add-column").on("click", function (e) {
    event.preventDefault();
    const inputValue = $('#newColumn').val();
    const newColumn = {};
    newColumn.title = inputValue
    lists.push(newColumn);
    const lastIndex = lists.length - 1;
    console.log(lists)
    $("#items").append(
        `<div class="jumbotron" data-col=${lastIndex}>
            <h4>${inputValue}</h4>
            <div class="items"></div>
        <div class="input-group mb-3">
        <input type="text" id="addCard${lastIndex}" class="form-control" placeholder="Add another card" aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary add-item" type="button" id="button-addon2" data-colnumber=${lastIndex}>Add card</button>
        </div>
      </div>
      </div>`
    )
    $(".add-item").on("click", function (event) {
        addItemtoDom(event);
    })
})

//delete a card

// );
// const onTodoItemClick = (event) => {
//     console.log('event', event);
//     const item = event.target.textContent;
//     doneArray.push(item);
//     removeItemFromTodo(item);
//     // Render the todo list
//     render();
//     // Render done list
//     renderDone();
//   }

// //adding columns

// const onDelete = function (event) {
//     // Get the html text from the clicked li
//     $(event.currentTarget).remove();
//     // Find the clicked list item in todoList array.
//     const index = todoList.findIndex(function (element) {
//       return element === item;
//     });
//     // Remove from the todoList array
//     todoList.splice(index, 1);
//     // Add to the doneList
//     doneList.push(item);
//     // create the DOM li element
//     const $li = $("<li>" + item + "</li>");
//     // Add to the DOM with id doneList
//     $("#doneList").append($li);
//   }