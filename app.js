let data = JSON.parse(localStorage.getItem("object")) || [
    {id: 1, name: "Raman", email: "raman@gmail.com"},
    {id: 2, name: "Mithul", email: "mithul@gmail.com"}
];

function readAll() {
    // Update localStorage with the current state of the data
    localStorage.setItem("object", JSON.stringify(data));

    var tabledata = document.querySelector(".data_table");
    var elements = "";

    data.map(record => (
        elements += `<tr>
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>
                <button type="button" onclick="edit(${record.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" onclick="deleteRecord(${record.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    ));

    tabledata.innerHTML = elements;
}


function createAll() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
}

function add() {
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;
    var newObj = { id: data.length ? data[data.length - 1].id + 1 : 1, name: name, email: email };

    data.push(newObj);
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display = "block";

    readAll();
}

function edit(id) {
    document.querySelector('.update_form').style.display = "block";
    var obj = data.find(rec => rec.id === id);

    if (obj) {
        document.querySelector('.id').value = obj.id;
        document.querySelector('.uname').value = obj.name;
        document.querySelector('.uemail').value = obj.email;
    }
}

function update() {
    var id = parseInt(document.querySelector('.id').value);
    var name = document.querySelector('.uname').value;
    var email = document.querySelector('.uemail').value;

    var index = data.findIndex(rec => rec.id === id);
    if (index !== -1) {
        data[index] = { id, name, email };
    }

    localStorage.setItem("object", JSON.stringify(data));
    document.querySelector('.update_form').style.display = "none";
    readAll();
}

function deleteRecord(id) {
    data = data.filter(rec => rec.id !== id);
    localStorage.setItem("object", JSON.stringify(data));
    readAll();
}

// Initialize the table on page load
readAll();
