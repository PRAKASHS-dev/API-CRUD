
//GET       - https://www.melivecode.com/api/users
//POST      - https://www.melivecode.com/api/users/create
//PUT       - https://www.melivecode.com/api/users/update
//DELETE    - https://www.melivecode.com/api/users/delete

const API_URL = "https://www.melivecode.com/api/users";

function handleError(message) {
    const error = document.getElementById("error");
    error.innerHTML = message;
    error.style.display = "block";
    setTimeout(() => error.style.display = "none", 3000);
}

// READ USER
function loadUser() {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        const { readyState, status, responseText } = this;
        if (readyState === 4 && status === 200) {
            let users = JSON.parse(responseText);
            users = users.map(u => {
                return (`
                <tr>
                    <td>${u.id}</td>
                    <td>
                        <img width="40px" src="${u.avatar}" alt="img not showing">
                    </td>
                    <td>${u.fname}</td>
                    <td>${u.lname}</td>
                    <td>${u.username}</td>
                    <td>    
                        <button class="btn btn-primary btn-sm"><i class="fa-solid fa-pen-to-square" onclick="populateUser(${u.id})"></i></button>
                        <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash" onclick="deleteUser(${u.id})"></i></button>
                    </td>
                </tr>
                `);
            });
            document.getElementById("content").innerHTML = users.join("");
        }
    }
    http.open("GET", API_URL);
    http.send();
}
loadUser();


// CREATE USER & UPDATE USER
function createUser(event) {
    event.preventDefault();
    const id = document.getElementById("userId").value
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const avatar = document.getElementById("url").value;

    const formData = { fname, lname, username, password, email, avatar };

    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        const { readyState, status, responseText } = this;
        if (readyState === 4 && status === 200) {
            const { status, message } = JSON.parse(responseText);
            if (status === "ok") {
                document.getElementById("userForm").reset();
                document.getElementById("userId").value = "";
                const success = document.getElementById("success");
                success.innerHTML = message;
                success.style.display = "block";
                setTimeout(() => success.style.display = "none", 3000);
                loadUser();
            } else {
                handleError(message);
            }
        }
    }

    if (id) {
        http.open("PUT", `${API_URL}/update`);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({ ...formData, id }));
    }
    else {
        http.open("POST", `${API_URL}/create`);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(formData));
    }

}

function populateUser(id) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        const { readyState, status, responseText } = this;
        if (readyState === 4 && status === 200) {
            const { status, user: { fname, lname, username, password, email, avatar } } = JSON.parse(responseText);
            if (status === "ok") {
                document.getElementById("userId").value = id;
                document.getElementById("fname").value = fname;
                document.getElementById("lname").value = lname;
                document.getElementById("username").value = username;
                document.getElementById("password").value = password;
                document.getElementById("email").value = email;
                document.getElementById("url").value = avatar;

            }
        }
    }
    http.open("GET", `${API_URL}/${id}`);
    http.send();
}

// DELETE USER
function deleteUser(id) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        const { readyState, status, responseText } = this;
        if (readyState === 4 && status === 200) {
            const { status, message } = JSON.parse(responseText);
            if (status === "ok") {
                const success = document.getElementById("success");
                success.innerHTML = message;
                success.style.display = "block";
                setTimeout(() => success.style.display = "none", 3000);
                loadUser();
            } else {
                handleError(message);
            }
        }
    }
    http.open("DELETE", `${API_URL}/delete`);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({ id }));
}

function btnRest() {
    const rest = document.getElementById("rest");
    rest = document.getElementById("userId").value = "";
}
