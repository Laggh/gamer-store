import {Link} from "react-router-dom"

function Navbar(){
    return (
    <nav className="navbar navbar-expand-lg border-bottom border-2">
        <div className="container-fluid">
            <Link to="/" className="display-5 text-decoration-none text-dark fw-bold">Gamer Store</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"/>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart" className="nav-link">Cart<span className="cart-icon"/></Link>
                </li>
            </ul>
            </div> 
        </div> 
    </nav>
    )
};

export default Navbar
