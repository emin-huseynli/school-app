import * as Yup from 'yup';
import type { IUser } from '../types/types';
import { registerUser } from '../services/authService';
import { useState } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { toast } from 'react-toastify';

const Register = () => {
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});


  const initialValues: IUser = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };

  const handleRegister = async (values: IUser) => {
    try {
      setLoading(true)
      await registerUser(values)
      toast.success("Registration completed successfully!");
    } catch (error) {
      toast.error("An error occurred!")
      console.log(error);

    }
    finally {
      setLoading(false)
    }
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Qeydiyyat
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {/* Name */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">Ad</label>
              <Field
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-1">Şifrə</label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className={`w-full py-2 rounded-md font-medium text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition`}
              disabled={loading}
            >
              {loading ? "Gözləyin..." : "Qeydiyyat"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};


export default Register