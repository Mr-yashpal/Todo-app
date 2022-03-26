if (typeof (Storage) !== "undefined") {
    // // var tag = document.createElement("p");
    // // var text = document.createTextNode("Tutorix is the best e-learning platform");
    // // tag.appendChild(text);
    // // var element = document.getElementById("new");
    // // element.appendChild(tag);

    var todoData = [];
    if (localStorage.getItem("data"))
        todoData = JSON.parse(localStorage.getItem("data"));

    // console.log(localStorage.getItem("data"));
    // console.log(JSON.parse(localStorage.getItem("data")));

    let addTodoSection = document.querySelector("#addTodo")
    addTodoSection.addEventListener("click", function (event) {
        event.preventDefault();
        var inputTitle = document.getElementById("inputValue");

        if (inputTitle.value != '') {
            todoData.push(inputTitle.value);
            console.log(todoData);//
            localStorage.setItem("data", JSON.stringify(todoData));
            inputTitle.value = "";
        }
        // window.location.reload();
        updateUi();

    }, false);

    function updateUi() {
        const items = JSON.parse(localStorage.getItem('data'));

        todoTitels.innerHTML = '';
        // console.log(todoTitels);
        // console.log("updating UI",todoTitels.innerHTML)
        if (todoData) {
            items.forEach(title => {
                const newSection = document.createElement("section");
                const newP = document.createElement("p");
                newSection.appendChild(newP);
                newP.innerText = title;
                const newSpan1 = document.createElement("span");
                const newButton1 = document.createElement("button");
                newButton1.setAttribute("class", "material-icons iconEdit")
                newButton1.setAttribute("onclick", "editTitle(event)");
                newButton1.innerText = "edit_note";
                newSpan1.appendChild(newButton1);
                newP.appendChild(newSpan1);

                const newButton2 = document.createElement("button");
                const newSpan2 = document.createElement("span");
                const newSpan3 = document.createElement("span");
                newSpan3.innerText = "incomplete";
                newSpan3.setAttribute("class", "taskStatus");
                newButton2.setAttribute("class", "material-icons iconDelet")
                newButton2.setAttribute("onclick", "deleteParent(event)");
                newButton2.innerText = "delete";
                newSpan2.appendChild(newButton2);
                newP.appendChild(newSpan2);
                newP.appendChild(newSpan3);
                todoTitels.appendChild(newSection);
                // newSection.setAttribute("id", `id${index}`);
            });
        }

    }

    function deleteParent(event) {
        event.preventDefault();
        let removeTitle = event.target.parentNode.parentNode.innerText.split("\n")[0];
        let todoData = JSON.parse(localStorage.getItem("data"));
        todoData.splice(removeTitle, 1);
        localStorage.setItem("data", JSON.stringify(todoData));
        updateUi();
        // window.location.reload()
        // event.target.parentNode.parentNode.parentNode.remove();
        // localStorage.removeItem(`${event.target.parentNode.parentNode.parentNode.id.split("id")[1]}`);
    }

    function editTitle(event) {
        event.preventDefault();
        // console.log(event.target.parentNode.parentNode.innerText);
        // console.log(event.target.parentNode.parentNode.parentNode.id.split("id")[1]);
        let prevValue = event.target.parentNode.parentNode.innerText.split("\n")[0];
        // document.querySelector("#inputValue").value = prevValue;
        event.target.parentNode.parentNode.innerHTML =
            `<form onsubmit='handleSubmit(event)'>
             <label for="title" class=""></label>
             <input id="editValue" tupe="text" class="edit" name="title" value=${prevValue}>
             <button type="submit" id="editSave">Save</button>
         </form>`
         let todoData = JSON.parse(localStorage.getItem("data"));
         todoData.splice(prevValue, 1);
         localStorage.setItem("data", JSON.stringify(todoData));
        // event.target.parentNode.parentNode.innerText.split("\n")[0] = document.querySelector("#inputValue").value;
        // document.getElementById("#inputValue").value= "lol";
        // console.log(event.target.parentNode.parentNode.parentNode.id.split("id")[1]);
        // inputTitle.value =event.target.parentNode.innerText.split("\n")[0];
        // event.target.parentNode.parentNode.remove();
        // localStorage.removeItem(`${event.target.parentNode.parentNode.parentNode.id.split("id")[1]}`);
        // const newP = document.createElement("p");
        // newSection.appendChild(newP);
        // newP.innerText = title;
    }
    function handleSubmit(event){
        event.preventDefault();
        if (document.querySelector("#editSave")) {
            let editSave = document.querySelector("#editSave")
            editSave.addEventListener("click", function (event) {
                console.log(event)
                // event.preventDefault();
                let editTitleValue = document.getElementById("editValue");
    
                // if (editTitle.value != '') {
                let todoData = JSON.parse(localStorage.getItem("data"));
                todoData.push(editValue.value);
                console.log(editValue.value);//
                console.log(editTitleValue.value);//
                // todoData.splice(removeTitle, 1);

                localStorage.setItem("data", JSON.stringify(todoData));
                // editValue.value = "";
                // }
                // else {
                //     console.log(event.target.parentNode.parentNode);
                //     event.target.parentNode.parentNode.remove();
                // }
                // window.location.reload();
                updateUi();
    
            }, false);
        }
    }


    // let editRemove = document.querySelector("#editRemove")
    // editRemove.addEventListener("click", function (event) {

    // }
    updateUi();

    // window.onload = (event) => {
    //     // var indexStr;
    //     for (indexx = 0; indexx <= localStorage.index; indexx++) {
    //         // indexStr = indexx.toString();
    //         // console.log(indexx, localStorage.getItem(indexx), localStorage.getItem(localStorage[indexx]) )
    //         const newSection = document.createElement("section");
    //         if (localStorage.getItem(indexx) != '' && localStorage.getItem(indexx) != null) {
    //             // console.log(indexx, localStorage.getItem(indexx))

    //             // newSection.innerHTML =
    //             // `<p>${localStorage.getItem(indexx)}
    //             //     <span class="material-icons iconEdit" onclick="editTitle(event)" >edit_note</button></span>
    //             //     <span class="material-icons iconDelet" onclick="deleteParent(event)" >delete</button></span>
    //             // </p>`
    //             const newP = document.createElement("p");
    //             newSection.appendChild(newP);
    //             newP.innerText = localStorage.getItem(indexx);
    //             const newSpan1 = document.createElement("span");
    //             const newButton1 = document.createElement("button");
    //             newButton1.setAttribute("class", "material-icons iconEdit")
    //             newButton1.setAttribute("onclick", "editTitle(event)");
    //             newButton1.innerText = "edit_note";
    //             newSpan1.appendChild(newButton1);
    //             newP.appendChild(newSpan1);

    //             const newButton2 = document.createElement("button");
    //             const newSpan2 = document.createElement("span");
    //             newButton2.setAttribute("class", "material-icons iconDelet")
    //             newButton2.setAttribute("onclick", "deleteParent(event)");
    //             newButton2.innerText = "delete";
    //             newSpan2.appendChild(newButton2);
    //             newP.appendChild(newSpan2);


    //             document.getElementById("main").appendChild(newSection);
    //             newSection.setAttribute("id", `id${indexx}`);
    //         }
    //     }
    // };


    // document.querySelector(".icon").addEventListener("click", function (event) {

    //     console.log()

    // }






}
else {
    alert("Sorry! No Web Storage support..")
}