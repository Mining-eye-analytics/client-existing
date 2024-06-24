// inporting style
import "../styles/register.scss";

// importing libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { ReactComponent as ClarityEyeLine } from "../assets/iconify/clarity--eye-line.svg";
import { ReactComponent as ClarityEyeHideLine } from "../assets/iconify/clarity--eye-hide-line.svg";

const Register = () => {
  // defining state variables with redux
  const mode = useSelector((state) => state.general.mode);

  // defining state variables with react hooks
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // function to handle register when the button is clicked or enter is pressed
  const registerHandler = (key) => {
    if (key === "Enter") {
      setRegisterMessage("");
      if (name === "" || username === "" || password === "") {
        setRegisterMessage("nama, username, dan password tidak boleh kosong");
      } else {
        setRegisterLoading(true);
        axios
          .post(
            window.location.protocol +
              "//" +
              (window.location.hostname === "localhost"
                ? "10.1.74.9"
                : window.location.hostname) +
              ":" +
              process.env.REACT_APP_API_PORT +
              "/api/sign-up",
            {
              name: name,
              username: username,
              password: password,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            setRegisterStatus(res.data.meta.status);
          })
          .catch((err) => {
            setRegisterStatus("failed");
            setRegisterMessage("nama atau username sudah terdaftar");
          })
          .finally(() => {
            setRegisterLoading(false);
          });
      }
    }
  };

  //react hooks to handle page redirection if register is successful
  useEffect(() => {
    if (registerStatus === "success") {
      if (window.location.href.includes("register")) {
        window.location.href = "/login";
      }
    }
  }, [registerStatus]);

  // rendering UI by returning HTML elements
  return (
    <div
      className={
        "register d-flex justify-content-center align-items-center" +
        (mode === "light" ? " register-light" : " register-dark")
      }
    >
      <div className="form-container rounded-4 d-flex justify-content-center align-items-center">
        <div className="px-5 py-4">
          <img
            className="mb-5"
            src={require("../assets/logo" +
              (mode === "light" ? "" : "-dark") +
              ".webp")}
            alt=""
          />
          <h3>Register</h3>
          <p>
            Silahkan isi beberapa detail di bawah ini untuk registrasi akun
            baru.
          </p>
          <form className="my-4 d-grid gap-2">
            <div className="d-grid gap-1">
              <label>Nama User</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama User"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  registerHandler(e.key);
                }}
              />
            </div>
            <div className="d-grid gap-1">
              <label>Username/ SID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Username atau SID"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  registerHandler(e.key);
                }}
              />
            </div>
            <div className="d-grid gap-1">
              <label>Password</label>
              <div className="d-flex align-items-center">
                <input
                  type={passwordVisibility === false ? "password" : "text"}
                  className="form-control"
                  placeholder="Masukkan Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    registerHandler(e.key);
                  }}
                />
                <span
                  className="password-visibility"
                  title="tampilkan/sembunyikan password"
                  onClick={() => {
                    setPasswordVisibility(!passwordVisibility);
                  }}
                >
                  {passwordVisibility === false ? (
                    <ClarityEyeLine />
                  ) : (
                    <ClarityEyeHideLine />
                  )}
                </span>
              </div>
            </div>
          </form>
          {registerLoading === false ? (
            <div className="d-grid">
              <button
                className="border-0 rounded-2 px-3 py-2"
                onClick={() => registerHandler("Enter")}
              >
                Daftar
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <label className="register-message mt-2">
            {registerMessage !== "" ? "*" + registerMessage : ""}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
