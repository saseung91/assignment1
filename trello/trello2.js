
//array of cards in the column
let listItems = []
//array of columns
const lists = []

//adding new cards to dom
function addItemtoDom(event) {
    event.preventDefault();
    const colnumber = event.currentTarget.dataset.colnumber;
    const inputField = $(`#addCard${colnumber}`);
    const inputValue = inputField.val();
    const newItem = {};
    //give each column unique date
    const uniqueId = Date.now();
    console.log("value of input", inputValue);
    $(`.jumbotron[data-col=${colnumber}] .items`).append(
        `<div class="row item" data-id=${uniqueId}>
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${inputValue}
                    <button type="button" data-column=${colnumber} class="btn btn-danger remove btn btn-primary btn-sm" data-id=${uniqueId}>x</button></h5>
                </div>
            </div>
        </div>
      </div > `)
    $(".remove").on("click", function (event) {
        //knows which card is deleted
        const uniqueId = parseInt(event.currentTarget.dataset.id);
        //remove matching one
        $(`.item[data-id=${uniqueId}]`).remove();
        console.log("button clicked");
        event.preventDefault();
        //knows which column its deleted from 
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

//create columns according to issues
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
    $("#flex-container").append(
        `<div class="jumbotron" data-col=${index}>
            <h4>${list.title}<button type="button" data-column=${index} class="btn btn-danger col-remove btn btn-primary btn-sm">x</button></h5>
            </h4>
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


//adding columns and cards
$("#add-column").on("click", function (e) {
    event.preventDefault();
    const inputValue = $('#newColumn').val();
    const newColumn = {};
    newColumn.title = inputValue
    lists.push(newColumn);
    const lastIndex = lists.length - 1;
    console.log(lists)
    $("#flex-container").append(
        `<div class="jumbotron" data-col=${lastIndex}>
            <h4>${inputValue} <button type="button" data-column=${lastIndex} class="btn btn-danger col-remove btn btn-primary btn-sm">x</button></h5></h4>
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
    $(".col-remove").on("click", function (event) {
        console.log("button clicked");
        const uniqueId = parseInt(event.currentTarget.dataset.column);
        console.log(uniqueId);
        $(`.jumbotron[data-col=${uniqueId}]`).remove();
        
        // event.preventDefault();
    })



})
