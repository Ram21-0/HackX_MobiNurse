const regform = document.getElementById("register-form");
regform.addEventListener('submit',registerUser);

async function registerUser(event){
    event.preventDefault();
    const username = document.getElementById('name').value;
    const pass = document.getElementById('pass').value;
    const name = document.getElementById('Patientname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const repass = document.getElementById('re_pass').value;
    if(pass != repass){
        document.getElementById("passcheck").innerHTML = "password do not match";
        console.log("error");
    }
    else{
        document.getElementById("passcheck").innerHTML = "";
        const result = await fetch('/signup',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                name,
                email,
                phone,
                pass
            })
        }).then((res)=>res.json());
        
        if(result.status=="error"){
            alert('username/email/phone is already registered');
            console.log("error");
        }
        else {
            alert('Registration Successful');
            location.href = 'login';
        }
    }
}

