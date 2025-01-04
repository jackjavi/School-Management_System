import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import axios from "axios";
// import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    admissionNumber: "",
    password: "",
  });

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
        formData
      );
      if (response.status === 200) {
        storeToken(response.data.token);
        await authenticateUser();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      console.log(error.response ? error.response.data : error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  const { password, admissionNumber } = formData;

  return (
    <main className="bg-indigo-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full "
      >
        <div className="w-full">
          <label htmlFor="admissionNumber">Admission Number: </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="text"
            id="admissionNumber"
            value={admissionNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password: </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <p className="error">{errorMessage}</p>
        {/*<p>
          You don't have an account ?{" "}
          <Link to={"/signup"}>
            <span className="underline">Sign up</span>
          </Link>
        </p>*/}
        <button className="w-full p-2 rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold ">
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
