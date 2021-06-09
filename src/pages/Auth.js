import './Auth.css';
import { useHistory } from 'react-router-dom';



export default function (props) {

    let history = useHistory();

    let submitHandler = (e) => {
        e.preventDefault();

        let data = {};

        data.email = e.target[0].value;
        data.pass = e.target[1].value;

        let urlRegister = `${process.env.REACT_APP_ROUTE}/auth/register`;
        let urlLogin = `${process.env.REACT_APP_ROUTE}/auth/login`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }

        if (e.nativeEvent.submitter.id == "register") {
            fetch(urlRegister, options).then(result => result.json().then(output => {
                if (output.status == 'success') {
                    alert('Congrats, you registered as well! Please login.')
                } else {
                    alert(output.message)
                }
                // console.log(output);
            }));
        } else if (e.nativeEvent.submitter.id == "login") {
            fetch(urlLogin, options)
                .then(result => result.json()
                    .then(output => {
                        console.log(output);
                        if (output.status == 'success') {
                            alert(output.status)
                            localStorage.setItem('token', output.token);

                            history.push("/contacts");

                            // props.setIsLoggedIn(true);
                        } else {
                            alert(output.status)
                            // localStorage.removeItem('token');
                        }
                    }));
        }
    }

    return (
        <div className="wrapper">
            <form onSubmit={submitHandler}>
                <input name="email" type="email" />
                <input name="pass" type="password" />
                <section>
                    <input id="register" type="submit" value="Register" />
                    <input id="login" type="submit" value="Login" />
                </section>
            </form>
        </div>
    )
}