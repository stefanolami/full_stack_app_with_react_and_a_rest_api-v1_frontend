import React from "react";
import { Link } from 'react-router-dom';

const Header = (props) => {

    const authUser = props.context.authenticatedUser;
    
    return (
        <header>
            <div className="wrap header--flex">
                <Link to="/">
                    <h1 className="header--logo">Courses</h1>
                </Link>
                <nav>
                    {
                        authUser ? (
                            <ul className="header--signedin">
                                <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
                        ) : (
                            <ul className="header--signedout">
                                <li><Link to="/signin">Sign In</Link></li>
                                <li><Link to="/signup">Sign Up</Link></li>
                            </ul>
                        )
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header;