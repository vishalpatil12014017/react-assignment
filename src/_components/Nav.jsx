import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!authUser) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                <NavLink to="/cards" className="btn btn-link nav-item nav-link">Add Card</NavLink>
                <NavLink to="/cardsview" className="btn btn-link nav-item nav-link">View Cards</NavLink>
            </div>
        </nav>
    );
}