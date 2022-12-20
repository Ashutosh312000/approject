var form = document.getElementById('form')
// form.addEventListener('submit', storevalues);
var section = document.getElementById('section');

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/expense/getexpense')
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                let myobj = response.data[i];
                makeuser(myobj);
            }
        })
        .catch((err) => {
            console.log(err)
        })
})


async function expensesubmit(e) {
    try{
        e.preventDefault();
        
        let expensedetails = {
            Amount: e.target.amount.value,
            Description: e.target.description.value,
            Catogary: e.target.catogary.value,
        }
        await axios.post("http://localhost:3000/expense/postexpense", {expensedetails})
            .then((response) => {
                // alert(response.data.message);
                let myobj1 = response.data.expense;
                makeuser(myobj1);
            })
            .catch((err) => {
                console.log(err);
                document.section.innerHTML = document.section.innerHTML + "<h4>SOMETHING WENT WRONG</h4>"
            })
    }
    catch(err){
        var message=err.response.data.message;
        console.log(message)
    }
   
}

function makeuser(myobj) {
    var details = document.createElement('ul');
    details.id = `${myobj.id}`;
    details.setAttribute('type', 'none');
    details.setAttribute('class', 'newli')
    section.appendChild(details);
    const parentnode = details;
    const childHTML = `<li>${myobj.Amount}    ${myobj.Description}    ${myobj.Catogary}    <button  class="stylenewli" onclick=deleteuser(event,'${myobj.id}')>Delete expense</button>
            // <button class="stylenewli" onclick=edituser('${myobj.id}')>Edit expense</button></li>`;
    parentnode.innerHTML = parentnode.innerHTML + childHTML;
}

deleteuser = function (e,key) {
    e.target.parentElement.parentElement.remove();
    axios.delete(`http://localhost:3000/expense/deleteAddExpense/${key}`)
        .then((response) => {
            
        })
        .catch((err) => { console.log(err) })
}
// edituser = function (key) {
//     axios.get(`http://localhost:5000/getAnExpense/${key}`)
//         .then((response) => {
//             console.log(response.data)
//             myobj = response.data[0];
//             document.getElementById('amount').value = myobj.Amount;
//             document.getElementById('discription').value = myobj.Discription;
//             document.getElementById('catogary').value = myobj.Catogary;

//             const parentnode2 = document.getElementById('bodies');
//             const childnode2 = document.getElementById(key);
//             parentnode2.removeChild(childnode2);

//             return key;
//         })
//         .then((key) => {
//             return axios.delete(`http://localhost:5000/deleteAddExpense/${key}`)
//         })
//         .catch(err => console.log(err))
// }
