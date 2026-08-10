import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="page-container error-page">
      <div className="error-content">
        <p className="error-number">404</p>

        <h1>That page isn't here.</h1>

        <p className="page-description">
          The page you're looking for may have moved or doesn't exist.
        </p>

        <Link to="/" className="primary-button">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
