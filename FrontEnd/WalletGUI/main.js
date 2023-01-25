window.addEventListener("DOMContentLoaded", async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.get("http://localhost:3000/expense/get-expense", { headers: { "Authorization": token } }).then((response) => {

            for (var i = 0; i < response.data.allUsers.length; i++) {
                showMeUser(response.data.allUsers[i]);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})
document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: { "Authorization": token } })
            alert('You are a Premium User now');
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment failed', function (response) {
        console.log(response);
        alert('something went wrong!!');
    })
}
async function savetoDB(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const detail = event.target.desc.value;
    const category = event.target.myCat.value;

    const obj = {
        amount,
        detail,
        category
    }
    const token = localStorage.getItem('token');
    try {
        await axios.post("http://localhost:3000/expense/add-expense", obj, { headers: { "Authorization": token } }).then(response => {
            console.log('***12344*****', response);
            showMeUser(response.data.newExpenseDetail);
        })
    }
    catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<H4>Something went wrong!<h4>";
        console.log(err);
    }

}

/*window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/admin/get-expense").then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.allUsers.length; i++) {
            showMeUser(response.data.allUsers[i]);
        }
    })
        .catch((err) => {
            console.log(err);
        })
})*/


function showMeUser(obj) {

    document.getElementById('details').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';


    const parentNode = document.getElementById('listofUsers');
    console.log('***123**', obj);
    const childNode = `<li class="items" id=${obj.id}> ₹${obj.amount} - ${obj.detail}
        <button onclick="deleteUser('${obj.id}')"> Delete expense </button>
        <button onclick="editUser('${obj.detail}','${obj.amount}','${obj.category}','${obj.id}')"> Edit </button>
          </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
async function deleteUser(userId) {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`, { headers: { "Authorization": token } })
            .then((response) => {
                removeFromScreen(userId);
            })
    }
    catch (err) {
        console.log(err);
    }

}
/*function deleteUser(userId) {

    axios.delete(`http://localhost:3000/admin/delete-expense/${userId}`)
        .then((response) => {
            removeFromScreen(userId);
        })

}*/
/*function editUser(emai, user, cate, userId) {
    document.getElementById('details').value = emai;
    document.getElementById('amount').value = user;
    document.getElementById('category').value = cate;
    deleteUser(userId);
    removeFromScreen(userId);

}*/
async function editUser(emai, user, cate, userId) {
    document.getElementById('details').value = emai;
    document.getElementById('amount').value = user;
    document.getElementById('category').value = cate;
    deleteUser(userId);
    removeFromScreen(userId);
    var editObj = {
        id: userId,
        amount: user,
        detail: emai,
        category: cate
    }
    try {
        await axios.put(`http://localhost:3000/expense/edit-expense/${userId}`, editObj)
            .then((response) => {
                //removeFromScreen(userId);
                deleteUser(userId);
                console.log('edited', response);
            })
    }
    catch (err) {
        console.log(err);
    }

}
function removeFromScreen(userId) {
    const parent = document.getElementById('listofUsers');
    const childtobeDeleted = document.getElementById(userId);
    if (childtobeDeleted) {
        parent.removeChild(childtobeDeleted);
    }
}