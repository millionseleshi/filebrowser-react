import { Link } from "react-router-dom";

const WelcomePage = () => {
  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Matrix Lab Code Editor</p>
          <button className="btn btn-primary">
            <Link to={'/code'}>
            Get Started
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;
