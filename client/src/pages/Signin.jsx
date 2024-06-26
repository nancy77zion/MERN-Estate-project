import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux" //dispatch hooks for redux
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice"; //import the userSlice
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user) //destructure the state from  /user/userSlice

  /*states now handled by redux above */
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch() // initial it

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      // setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setLoading(false);
        // setError(data.message);
        return;
      }

      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null)
      navigate('/')
      
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setLoading(false);
      // setError(error.message);
    }
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name=""
          id="email"
          placeholder="email"
          className="border p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="password"
          className="border p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Processing...." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
