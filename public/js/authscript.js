
main()
function main()  {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const backLogin = document.getElementById('back-login');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', register);
    loginForm.addEventListener('submit', login);
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    backLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    function setErrorMessage(message){
        errorMessage.innerText = message; 
    }
    async function register(e){
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        let new_email = formData.get('new-email');
        let new_username = formData.get('new-username');
        let new_password = formData.get('new-password');
        let err_msg;
        if (new_username.length < 3){
            setErrorMessage("Username must be at least 3 character.");
            return;
        }
        if (new_password.length < 6){ 
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({
                username: new_username,
                email: new_email, 
                password: new_password
            })
        });
        const result = await response.json();
        if (result.error){
            setErrorMessage(result.error);
        }
        else if (result.redirect){
            window.location.href = result.redirect; 
        }
    }
    catch (error){
        console.log(error);
        setErrorMessage("Server Error");
    }
    }
    async function login(e){
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        let new_email = formData.get('email');
        let new_password = formData.get('password');

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    email: new_email, 
                    password: new_password
                })
            });

            const result = await response.json();
            if (result.error){
                setErrorMessage(result.error);
            }
            else if (result.redirect){
                window.location.href = result.redirect; 
            }

        }
        catch {
            setErrorMessage("Login Failed");
        }
    }
}