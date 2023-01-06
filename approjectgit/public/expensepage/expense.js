var form = document.getElementById('form')
// form.addEventListener('submit', storevalues);
var section = document.getElementById('section');

window.addEventListener("DOMContentLoaded", () => { 
    const token=localStorage.getItem('token'); 
    axios.get('http://localhost:3000/expense/getexpense',{headers:{"Authorization" : token}})
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
        const token=localStorage.getItem('token'); 
        let expensedetails = {
            Amount: e.target.amount.value,
            Description: e.target.description.value,
            Catogary: e.target.catogary.value,
        }
        await axios.post("http://localhost:3000/expense/postexpense", {expensedetails},{headers:{"Authorization" : token}})
            .then((response) => {
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
    details.setAttribute('type', 'none');
    details.setAttribute('class', 'newli')
    section.appendChild(details);
    const parentnode = details;
    const childHTML = `<li>${myobj.Amount}    ${myobj.Description}    ${myobj.Catogary}    <button  class="stylenewli" onclick=deleteuser(event,'${myobj.id}')>Delete expense</button></li>`;
    parentnode.innerHTML = parentnode.innerHTML + childHTML;
}

deleteuser = function (e,key) {
    e.target.parentElement.parentElement.remove();
    const token=localStorage.getItem('token'); 
    axios.delete(`http://localhost:3000/expense/deleteAddExpense/${key}`,{headers:{"Authorization" : token}})
        .then((response) => {
            
        })
        .catch((err) => { console.log(err) })
}


document.getElementById('premiumbtn').onclick= async function(e){   

    const token=localStorage.getItem('token');                     

    const response=await axios.get('http://localhost:3000/purchase/premiummembership', {headers:{"Authorization" : token}});
    var options= 
    {
        "key":response.data.key_id, 
        "order_id":response.data.order.id,

        "handler": async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{ 
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id, 
            },{headers : {"Authorization" :token}})  

            alert('You are a Premium User Now')
        }

    };
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',async function(response){ 
        await axios.post('http://localhost:3000/purchase/updatetransactionstatusfailed',{ 
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id, 
        },{headers : {"Authorization" :token}})  

        alert('Something Went Wrong')
    });

}
