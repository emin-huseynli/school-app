import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import type { ILogin } from '../types/types';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const Login = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { login } = auth;
  
  const [loading, setLoading] = useState(false)


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues: ILogin = {
    email: "",
    password: ""
  }

  const handleLogin = async (values: ILogin) => {
    try {
      setLoading(true)

      const user = await loginUser(values.email, values.password)
      login(user)

      toast.success("Login successful!");

    } catch (error) {

      console.log(error);

      toast.error("Invalid email or password!")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-2 rounded-md font-medium text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login