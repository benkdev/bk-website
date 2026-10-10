import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "404: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <SEO
        title="404 – Page Not Found"
        description="The requested page could not be found."
      />
      <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-6xl font-light text-forest-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-6 text-sm">
          The requested page <code className="bg-gray-100 px-1.5 py-0.5 rounded text-forest-700">{location.pathname}</code> does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-forest-700 text-white font-medium hover:bg-forest-800 transition-colors shadow-sm"
        >
          Return to Overview
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
