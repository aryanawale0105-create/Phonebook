document.addEventListener("DOMContentLoaded", loadContacts);

function addContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
        alert("Please fill all fields");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, phone });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";

    loadContacts();
}

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let list = document.getElementById("contactList");
    list.innerHTML = "";

    contacts.forEach((c, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <span><b>${c.name}</b> - ${c.phone}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    loadContacts();
}

function searchContact() {
    let filter = document.getElementById("search").value.toLowerCase();

    let items = document.querySelectorAll("#contactList li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(filter) ? "" : "none";
    });
}