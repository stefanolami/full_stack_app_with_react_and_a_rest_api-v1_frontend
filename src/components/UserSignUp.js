import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignUp = (props) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    
    // Prevents forms default behavior, assigns useState variables to user, calls signUp()
    const submit = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }
        props.context.actions.signUp(user)
            .then(res => {
                if (res === true) {
                    navigate("/");
                } else {
                    setErrors(res);
                }
            })
            .catch(error => {
                console.log(error.message)
                navigate("/error")
            })
    }
   
    return (
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {
                    errors.length > 0 ? (
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {
                                    errors.map((error, index) => {
                                        return (
                                            <li key={index}>{error}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )
                }
                <form onSubmit={submit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={(e) => setLastName(e.target.value)} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={(e) => setEmailAddress(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="button" type="submit">Sign Up</button>
                    <Link to="/"><button className="button button-secondary">Cancel</button></Link>
                    <p className="signing--message">Already have a user account? Click here to <Link to="/signin" onClick={() => props.context.actions.setUrlParams("/")}>sign in</Link>!</p>
                </form>
            </div>
        </React.Fragment>
    )
}

export default UserSignUp;