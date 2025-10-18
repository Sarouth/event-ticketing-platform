import { Link } from "react-router-dom";

export default function Header() {
  // simplified header: always show Login / Register links for this UI

  return (
    <header className="site-header">
      <div className="brand">
        <Link to="/" className="brand-link">TicketHub</Link>
        <div style={{fontSize:'.8rem', color:'rgba(255,255,255,0.7)', fontWeight:700}}>TICKETS ANYTIME ANYWHERE!</div>
      </div>
      <nav className="nav">
        <Link to="/">Explore</Link>
        <Link to="/">Artist Bookings</Link>
        <Link to="/">Event Management</Link>
      </nav>
      <div className="actions">
        <Link to="/create" className="btn-list">List Your Event</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
}
