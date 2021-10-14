// admin signup js

const regform = document.getElementById("register-form");
regform.addEventListener('submit',registerUser);

async function registerUser(event){
    event.preventDefault();
    const username = document.getElementById('name').value;
    const pass = document.getElementById('pass').value;
    const repass = document.getElementById('re_pass').value;
    const qualification = document.getElementById('qualification').value;
    const resume = document.getElementById('resume').value;


    if(pass != repass){
        document.getElementById("passcheck").innerHTML = "password do not match";
    }
    else{
        document.getElementById("passcheck").innerHTML = "";
        const result = await fetch('/signup_admin',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                    pass,
                    qualification,
                    resume
            })
        }).then((res)=>res.json());

        if(result.status=="error")
            alert('Employee ID is already registered');
        else {
            alert('Registration Successful');
            location.href = '/login_admin';
        }
    }
}

