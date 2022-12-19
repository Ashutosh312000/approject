
async function  login(e){
    try{
     e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    
    let logindetails={
        email:email,
        password:password
    }

    axios.post('http://localhost:3000/user/login',{logindetails})
    .then((response)=>{
        alert(`${response.data.message}`);
    })
    .catch(err=>console.log(err));

    }
    catch(err){
        console.log(err);
    }
    
}