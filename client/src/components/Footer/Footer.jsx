import "./Footer.scss"
import { Link, Navigate } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <main className="footer">
                <Link to="/" className="footer__logo">
                    ByBartr - 2024
                </Link>

                <Link to="/communityguidelines" className="footer__cg">
                    community guidelines ↗
                </Link>

            </main>
        </>
    );
}

export default Footer