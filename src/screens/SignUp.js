import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials!");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url("https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1424&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          width: "350px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="name" style={{ fontWeight: "bold" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <small
              id="emailHelp"
              style={{ display: "block", marginTop: "5px" }}
            >
              We'll never share your email with anyone else.
            </small>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="password" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="geolocation" style={{ fontWeight: "bold" }}>
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              id="geolocation"
              onChange={onChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <Link
            to="/login"
            className="btn btn-danger"
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
