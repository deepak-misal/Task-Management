let task = {}
var myList = []

window.onload = function() {
    if (!getFromAdmin())
        return;

    myList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myList.length; index++) {
        if (!myList[index].isDeleted)
            renderElements(myList[index]);
    }
};

let input = document.querySelector('input');
input.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        let info = input.value.trim();
        if (info)
            addToList(info);
        input.value = "";
        input.focus();
    }

})

function storeToAdmin() {
    localStorage.setItem("myTaskList", JSON.stringify(myList));
}

function getFromAdmin() {
    return localStorage.getItem("myTaskList");
}

function renderElements(task) {
    var ul = document.getElementById('taskList');

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task.info));
    ul.prepend(li);

    var btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", function() {
        var id = task.id;
        ul.removeChild(li);
        task.isDeleted = true;
        btnDelete.remove();
        console.log(myList)
        storeToAdmin(task);
    });
    li.append(btnDelete);
    storeToAdmin();
}

function addToList(info) {
    task = {
        id: Date.now(),
        info: info,
        createdTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        isDeleted: false,
    };
    myList.push(task);
    renderElements(task);
    storeToAdmin(myList);
    console.log(myList);

}
var deletAllButton=document.getElementById("deleteAll").addEventListener("click",function(){
    console.log("hi")
});
function deleteAll(){
    if (!getFromAdmin())
        return;

    myList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myList.length; index++) {
        if (!myList[index].isDeleted)
            myList[index].isDeleted=true;
    }
}
deleteAll();
