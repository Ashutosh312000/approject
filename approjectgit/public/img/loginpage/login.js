const submitbtn=document.getElementById('submitbtn');
const form=document.getElementById('form');

const loginmessage=(message)=>{
    var loginMessage=document.createElement('div');
        loginMessage.className='loginmessage';
        loginMessage.textContent=`${message}`;
        form.insertBefore(loginMessage,submitbtn)

        setTimeout(() => {
            loginMessage.remove();
        }, 2000);
}

async function  login(e){
    try{
     e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    
    let logindetails={
        email:email,
        password:password
    }

   await  axios.post('http://localhost:3000/user/login',{logindetails})
    .then((response)=>{
        localStorage.setItem('token',`${response.data.token}`) 
        alert(`${response.data.message}`);   
        window.location.href="../expensepage/expense.html" 
    })
    .catch(err=>{
        var message=err.response.data.message;
        loginmessage(message);
    });

    }
    catch(err){
        var message=err.response.data.message;
        loginmessage(message);
    }
    
}