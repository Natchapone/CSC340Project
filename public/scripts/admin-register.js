document.addEventListener('DOMContentLoaded', function(){
    const btn = document.getElementById('submit');
    btn.addEventListener('click', function (){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const authorization = document.getElementById('authorization').value;
        const reqBody = {
            email: email,
            password: password,
            authorization: authorization,
        }
        console.log(reqBody);
        fetch ('/account/Admin/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then(response=> {
            if (!response.ok){
                throw new Error ('Response not ok');
            }
            window.location.href='http://localhost:8000/admin-login.html';
            return response;

        })
        .catch (error => {
            const errorBox= document.getElementById ('errorBox');
            errorBox.innerHTML='';
            errorBox.textContent='Invalid Submission';
        });
    })
});