
var form = document.querySelector("#addForm");
var itemsList = document.querySelector("#items");
var filter = document.querySelector("#filter");

// Добавление новой задачи - прослушка события
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", removeItem);

// фильтрация - прослушка ввода
filter.addEventListener("keyup", filterItems)

// Добавление новой задачи - функция
function addItem(e) {
    // отменяем отправку формы
    e.preventDefault();

    // Находим инпут с текстом для новой задачи
    var newItemInput = document.querySelector("#newItemText");
    
    // Получаем текст из инпута
    var newItemText = newItemInput.value;
    
    // Создаем элемент для новой задачи
    var newElement = document.createElement("li");
    newElement.className = "list-group-item";
    
    //Добавить текст в новый элемент
    var newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);
    
    // Создаем кнопку удаления
    var deleteBtn = document.createElement("button");

    // ДОбавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // Добавляем CSSкласс и data-атрибут в кнопку
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.setAttribute("action", "delete");

    
    // Добавляем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    console.log(newElement);

    //Добавляем задачу в список со всеми задачами
    itemsList.prepend(newElement);
    
    // Очистим поле добавления новой задачи
    newItemInput.value = "";
}

// Удаление элемента - функция
function removeItem(e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {
            e.target.parentNode.remove();
        }
    }
}

// фильтрация - функция
function filterItems(e) {
    // Получаем фразу для поиска и переводим ее в нижний регистр
    var searchedText = e.target.value.toLowerCase();
    
    // 1. Получаем список всех задач
    var items = itemsList.querySelectorAll("li");

    // Перебираем циклом все найденные теги li с задачами
    items.forEach(function (item) {
        // Получаем текст задачи из списка и переводим в нижний регистр
        var itemText = item.firstChild.textContent.toLowerCase();

        // проверяем на вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // если вхождение есть - показываем элемент с задачей
            item.style.display = "block";
        } else {
            // если вхождение нет - скрываем элемент с задачей
            item.style.display = "none";
        }
    })
}


