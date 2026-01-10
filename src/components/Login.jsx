import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      const url = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm
        ? { emailId, password }
        : { firstName, lastName, emailId, password };

      const result = await axios.post(BASE_URL + url, payload, {
        withCredentials: true,
      });

      dispatch(addUser(isLoginForm ? result.data : result.data.savedUser));
      navigate(isLoginForm ? "/" : "/profile", { replace: true });
    } catch (err) {
      setError(
        typeof err?.response?.data === "string"
          ? err.response.data.replace(/^ERROR:/, "")
          : "We couldn’t sign you in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-base-200/90 via-base-200/80 to-base-200/90">
        {" "}
        <div className="relative mx-auto max-w-6xl min-h-screen grid md:grid-cols-2 gap-16 items-center px-6">
          {/* Left: Brand / Story */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to <span className="text-primary">devConnect</span>
            </h1>
            <p className="text-lg text-base-content/70 leading-relaxed">
              A secure platform built for professionals to connect, collaborate,
              and grow.
            </p>

            <ul className="space-y-2 text-base-content/70">
              <li>✔ Secure authentication</li>
              <li>✔ Trusted by developers</li>
              <li>✔ Meet Every developers globally</li>
            </ul>
          </div>
          {/* Right: Auth Card */}
          <div className="card bg-base-100 shadow-2xl rounded-2xl w-full max-w-md mx-auto">
            <div className="card-body space-y-5">
              {/* Card Header */}
              <div className="text-center space-y-1">
                <h2 className="text-3xl font-bold">
                  {isLoginForm ? "Sign in" : "Create your account"}
                </h2>
                <p className="text-sm text-base-content/60">
                  {isLoginForm
                    ? "Welcome back. Please enter your details."
                    : "Join thousands of professionals today."}
                </p>
              </div>

              {/* Form */}
              {!isLoginForm && (
                <div className="grid grid-cols-2 gap-3 ">
                  <input
                    type="text"
                    placeholder="First name"
                    className="input input-bordered"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="input input-bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              )}

              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered mx-auto"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered mx-auto"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error */}
              {error && (
                <div className="alert alert-error text-sm py-2">{error}</div>
              )}

              {/* CTA */}
              <button
                className="btn btn-primary w-full"
                onClick={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : isLoginForm ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>

              {/* Switch */}
              <p className="text-center text-sm text-base-content/70">
                {isLoginForm ? "New here?" : "Already have an account?"}{" "}
                <span
                  className="link link-primary cursor-pointer"
                  onClick={() => {
                    setIsLoginForm(!isLoginForm);
                    setError("");
                  }}
                >
                  {isLoginForm ? "Create account" : "Sign in"}
                </span>
              </p>

              {/* Trust Footer */}
              <p className="text-center text-xs text-base-content/50">
                Secure login · Privacy protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
