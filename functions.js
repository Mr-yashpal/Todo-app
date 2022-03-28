if (typeof (Storage) !== "undefined") {
    if (!localStorage.getItem("data")) {
        let todoData = [];
        localStorage.setItem("data", JSON.stringify(todoData));
    }
    else {
        var todoData = JSON.parse(localStorage.getItem("data"));
    }
    if (!localStorage.getItem('completedData')) {
        const completedItems = [];
        localStorage.setItem("completedData", JSON.stringify(completedItems));
    }
    else {
        const completedItems = JSON.parse(localStorage.getItem('completedData'));
    }
    if (!localStorage.getItem("index") || todoData.length < 1) {
        localStorage.setItem("index", "0");
    }

    var addTodoSection = document.querySelector("#addTodo")
    addTodoSection.addEventListener("click", function (event) {
        var index = JSON.parse(localStorage.getItem("index"));
        var todoData = JSON.parse(localStorage.getItem("data"));

        event.preventDefault();
        var inputTitle = document.getElementById("inputValue");
        inputTitle.value.trim();

        if (inputTitle.value != '' && inputTitle.value != ' ') {
            todoData.push(inputTitle.value);
            localStorage.setItem("data", JSON.stringify(todoData));
            inputTitle.value = "";
        }
        localStorage.setItem("index", ++index);
        updateUi();
    }, false);

    function updateUi() {
        const items = JSON.parse(localStorage.getItem('data'));
        const completedItems = JSON.parse(localStorage.getItem('completedData'));

        var index = 0;
        var todoTitels = document.getElementById('todoTitels')
        todoTitels.innerHTML = '';
        if (items) {
            items.forEach(title => {
                const newSection = document.createElement("section");
                newSection.setAttribute("id", `s${index}`);

                const p1 = document.createElement("p");
                p1.setAttribute("id", `p1${index}`);
                newSection.appendChild(p1);
                p1.innerText = title;

                const p2 = document.createElement("p");
                newSection.appendChild(p2);

                const newSpan1 = document.createElement("span");
                const checkboxTask = document.createElement("input");
                checkboxTask.setAttribute("id", `c${index}`);
                checkboxTask.setAttribute("type", "checkbox");
                checkboxTask.setAttribute("class", "checkboxStatus");
                checkboxTask.setAttribute("onclick", "checkToComplete(event)");
                newSpan1.appendChild(checkboxTask);

                if (completedItems.includes(title)) {
                    p1.innerText = '';
                    const del = document.createElement("del");
                    del.innerText = title;
                    p1.appendChild(del);
                    checkboxTask.checked = true;
                }

                const newSpan2 = document.createElement("span");
                const editButton = document.createElement("button");
                editButton.setAttribute("id", `e${index}`);
                editButton.setAttribute("class", "material-icons iconEdit")
                editButton.setAttribute("onclick", "editTitle(event)");
                editButton.innerText = "edit_note";
                newSpan2.appendChild(editButton);
                p2.appendChild(newSpan1);
                p2.appendChild(newSpan2);

                const newSpan3 = document.createElement("span");
                const deleteButton = document.createElement("button");
                deleteButton.setAttribute("id", `d${index}`);
                deleteButton.setAttribute("class", "material-icons iconDelet")
                deleteButton.setAttribute("onclick", "deleteParent(event)");
                deleteButton.innerText = "delete";
                newSpan3.appendChild(deleteButton);
                p2.appendChild(newSpan3);
                todoTitels.appendChild(newSection);

                // editForm functionality form here.
                const newForm = document.createElement("form");
                newForm.setAttribute("onsubmit", "handleSubmit(event)");
                newForm.setAttribute("class", "visiblity");
                newForm.setAttribute("id", `editForm${index}`);


                const newlabel = document.createElement("label");
                newlabel.setAttribute("for", "title");

                const newInput = document.createElement("input");
                newInput.setAttribute("id", `editValue${index}`);
                newInput.setAttribute("type", "text");
                newInput.setAttribute("class", "edit");
                newInput.setAttribute("name", "title");
                newInput.setAttribute("value", title);

                const saveButton = document.createElement("button");
                saveButton.setAttribute("type", "submit");
                saveButton.setAttribute("id", `editSave${index}`);
                saveButton.innerText = "Save";

                newForm.appendChild(newlabel);
                newForm.appendChild(newInput);
                newForm.appendChild(saveButton);
                newSection.appendChild(newForm);
                index++;
            });
        }
    }

    function checkToComplete(event) {
        let cid = event.target.id;
        let checkboxElement = document.getElementById(cid);
        let p1id = `p1${cid.split("c")[1]}`;
        let pElement = document.getElementById(p1id);
        let getTitle = pElement.innerText;

        if (!localStorage.getItem("completedData"))
            var completedItems = [];
        else {
            var completedItems = JSON.parse(localStorage.getItem("completedData"));
        }

        if (checkboxElement.checked == true) {
            pElement.innerText = '';
            const del = document.createElement("del");
            del.innerText = getTitle;
            pElement.appendChild(del);

            completedItems.push(getTitle);
            localStorage.setItem("completedData", JSON.stringify(completedItems));
        }
        else {
            pElement.innerText = getTitle;

            function match(title) {
                return title != getTitle;
            }

            function removeCompletedTitle() {
                let updateCompletedItems = completedItems.filter(match);
                localStorage.setItem("completedData", JSON.stringify(updateCompletedItems));
            }
            removeCompletedTitle();
        }
    }

    function deleteParent(event) {
        let did = event.target.id;
        let index = did.split("d")[1];
        let sectionid = `s${index}`;
        let sectionElement = document.getElementById(sectionid);

        let p1id = `p1${index}`;
        let pElement = document.getElementById(p1id);
        let getTitle = pElement.innerText;

        let todoData = JSON.parse(localStorage.getItem("data"));

        function match(title) {
            return title != getTitle;
        }

        function removeTitle() {
            let updateTodoData = todoData.filter(match);

            localStorage.setItem("data", JSON.stringify(updateTodoData));
            sectionElement.remove();
        }
        removeTitle();
    }

    function editTitle(event) {
        let eid = event.target.id;
        let index = eid.split("e")[1];
        let sectionid = `s${index}`;
        let sectionElement = document.getElementById(sectionid);

        let p1id = `p1${index}`;
        let pElement = document.getElementById(p1id);
        let oldValue = pElement.innerText;
        pElement.innerText = '';
        let editForm = document.getElementById(`editForm${index}`);
        editForm.style.display = "block";


        let savetitle = document.querySelector(`#editSave${index}`)
        savetitle.addEventListener("click", function (event) {
            event.preventDefault();
            const newTitle = document.getElementById(`editValue${index}`);
            let newValue = newTitle.value;

            pElement.innerText = newValue;
            editForm.style.display = "none";

            function editTitle() {
                let todoData = JSON.parse(localStorage.getItem("data"));


                todoData.forEach(replaceTitle, index);
                function replaceTitle(value) {
                    if (value == oldValue) {
                        todoData[index] = newValue;
                    }
                }

                localStorage.setItem("data", JSON.stringify(todoData));
            }
            editTitle();

        }, false);
    }
    updateUi();
}
else {
    alert("Sorry! No Web Storage support..")
}