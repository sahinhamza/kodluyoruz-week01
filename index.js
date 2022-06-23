// "Postlar Yükle" butonuna ait özellik atamaları
document.querySelector("#loadPost").addEventListener("click", () => {

    // datalar fetch edilirken loading özelliği eklemesi
    const li = document.createElement("li");
    li.innerHTML =`<p id="preloading">Loading...</p>`
    document.querySelector("#ul-1").appendChild(li);

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(response => {
        document.querySelector("#ul-1").removeChild(li)
        const posts = response.slice(0,20);
        renderPost(posts);
        togglePost("block");
        toggleTable("none");
    })
    .catch(e => {
        console.log(e);
        alert("Bizden kaynaklı bir hata oluştu özür dileriz");
        document.querySelector("#ul-1").removeChild(li);
    });
    
    
});


function renderPost(data = []) {
    data.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="card">
            <div class="card-body">
                ${item.title}
            </div>
        </div>`
        document.querySelector("#post").appendChild(li);
    });
}

// "Kullanıcıları Yükle" butonuna ait özellik atamaları
document.querySelector("#loadUsers").addEventListener("click", () => {

    // datalar fetch edilirken loading özelliği eklemesi
    const li = document.createElement("li");
    li.innerHTML =`<p id="preloading">Loading...</p>`
    document.querySelector("#ul-1").appendChild(li);

    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(response => {
        document.querySelector("#ul-1").removeChild(li);
        users = response.map((item, index) => {
            item.orderNo = index + 1;
            return item;
        });
        toggleTable("block");
        togglePost("none");
        renderUsers(users);
    })
    .catch(e => {
        console.log(e);
        alert("Bizden kaynaklı bir hata oluştu özür dileriz");
        document.querySelector("#ul-1").removeChild(li);
    });
    
});


function renderUsers(users = []) {
    const userDom = document.querySelector("#user");
    userDom.innerHTML = "" ;

    const table = document.createElement("table");
    table.classList.add("table");
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
    <th scope="col">Id</th>
      <th scope="col">Sıra No <span class="arrowdown"></span> </th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Website</th>
      <th scope="col">Actions</th>
    </tr>`
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    tbody.innerHTML = users.map((user, index) => {
      return `<tr>
        <th scope="row">${user.id}</th>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
        <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>
        </td>
      </tr>`
    }).join(" ");

    table.appendChild(tbody);
    userDom.appendChild(table);
  
    // "sil" butonu özellik atamaları
    document.querySelectorAll(".remove").forEach(button => {
      button.addEventListener("click", function () {
        const status = confirm("Kaydı silmek üzeresiniz emin misiniz?");
        if (status) {
          const id = this.getAttribute("data-id");
          renderUsers(users.filter(user => user.id != id));
        }
      });
    });
  
    // "güncelle" butonu özellik atamaları
    document.querySelectorAll(".update").forEach(button => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const _user = users.find(user => user.id == id);
        fillUser(_user);
        toggleUser();
        toggleTable("none");
      });
    });

    // listeyi tersten sıralayan fonksiyon
    document.querySelector(".arrowdown").addEventListener("click", () => {
        users.sort((a,b) => {return b.orderNo - a.orderNo});
        users.map((item, index) => {
            item.orderNo = index + 1;
            return item;
        });
        renderUsers(users);
    });
      
}


const toggleTable = (display = "none") => {
    document.querySelector("#user").style.display = display;
}
  
const toggleUser = (display = "block") => {
    document.querySelector("#user-form").style.display = display;
}

const togglePost = (display = "none") => {
    document.querySelector("#post").style.display = display;
}
 
const fillUser = (user) => {
    document.querySelector("#labelName").value = user.name;
    document.querySelector("#labelPhone").value = user.phone;
    document.querySelector("#labelWebSite").value = user.website;
    document.querySelector("#labelEmail").value = user.email;
    document.querySelector("#userId").value = user.id;
}
  

// değişiklikleri "kaydet" butonu özellik atamaları 
document.querySelector("#save").addEventListener("click", () => {

    const name = document.querySelector("#labelName").value
    const phone = document.querySelector("#labelPhone").value
    const webSite = document.querySelector("#labelWebSite").value
    const email = document.querySelector("#labelEmail").value
    const userId = document.querySelector("#userId").value
    const index = users.findIndex(user => user.id == userId)
    users[index] = { name, phone, website: webSite, email, id: userId, orderNo: index+1 }
    renderUsers(users)
    toggleTable("block");
    toggleUser("none");
    alert("Güncelleme işlemi başarıyla gerçekleşti");      
})

// "vazgeç butonu özellik atamaları"
document.querySelector("#cancel").addEventListener("click", () => {
    toggleTable("block");
    toggleUser("none");
})
  
  