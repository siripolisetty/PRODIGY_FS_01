import React,{useContext,UseState} from 'react';
import {Link} from 'react-router-dom';
import {store} from'./App';

const Nav=()=>{
    const [token,setToken]=useContext(store)
    return(
        <div>
            {!token && (
            <ul>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        )}
        </div>
    )
}
export default Nav