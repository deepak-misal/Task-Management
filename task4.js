let task = {}
var myList = []
var total = 0;
var lastUpdatedTime;

window.onload = function() {
    if (!getFromAdmin())
        return;

    myList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myList.length; index++) {
        if (!myList[index].isDeleted) {
            total++;
            document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
            renderElements(myList[index]);
        }
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

function storeLastUpdatedTime() {
    localStorage.setItem("lastUpdatedTime", moment().format('MMMM Do YYYY, h:mm:ss a'))
}

function getFromAdmin() {
    return localStorage.getItem("myTaskList");
}

function getLastUpdatedTime() {
    return localStorage.getItem("lastUpdatedTime");
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
        total--;
        storeToAdmin(task);
        storeLastUpdatedTime();
        document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
        document.getElementById('total').innerHTML = "Total : " + total;
    });
    li.append(btnDelete);
    storeToAdmin();
    document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
    document.getElementById('total').innerHTML = "Total : " + total;
}

function addToList(info) {
    task = {
        id: Date.now(),
        info: info,
        createdTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
        isDeleted: false,
    };
    total++;

    myList.push(task);
    renderElements(task);
    storeToAdmin(myList);
    storeLastUpdatedTime();
    document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : " + getLastUpdatedTime();
    document.getElementById('total').innerHTML = "Total : " + total;
    console.log(myList);
}


document.getElementById('deleteAll').addEventListener("click", function() {
    console.log("Delete All");
    if (!getFromAdmin())
        return;

    myList = JSON.parse(getFromAdmin())
    for (let index = 0; index < myList.length; index++) {
        if (!myList[index].isDeleted) {
            myList[index].isDeleted = true;
            storeToAdmin();
            storeLastUpdatedTime();
            // document.getElementById('lastUpdatedTime').innerHTML = "Last Updated Time : "+getLastUpdatedTime();
        }
    }

})