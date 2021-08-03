import SignInUpForm from "../RegisterForm/SignInUpForm";

function Login() {
    return (
        <section className="login">
            <SignInUpForm 
                login = {true}
            />
        </section>
    )
}

export default Login;