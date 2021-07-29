import React, {useContext} from 'react'
import { UserContext } from '../../UserContext'

export const Navbar = () => {    
    const { user, setUser } = useContext(UserContext);
    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/logout', {
                credentials: 'include'
            })
            await res.json()
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/signup">Sign Up</a></li>
                    {user ? (<li><a onClick={logout} href="/">Logout</a></li>) : (<li><a href="/login">Login</a></li>)}
                </ul>
            </div>
        </nav>
    )
}
