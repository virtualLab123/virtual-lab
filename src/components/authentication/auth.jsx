import Login from "./login";
import loginImg from "../../assets/loginCartoon.png";
import SignUp from "./signUp";
import { useState, useEffect } from "react";
import Logo from "../../assets/Netzero.jpg";
import gctLogo from "../../assets/Government_College_of_Technology,_Coimbatore_logo.png";
import vlabImg from "../../assets/vlab.png";
import { Player } from "@lottiefiles/react-lottie-player";
import codeLottie from "../../assets/codeLottie.json";
import ForgotForm from "./forgotForm";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Input } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { api } from "../../constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Auth = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const toastifySuccess = () => {
    toast.success("Successfully SignedIn !!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const toastifyFailure = () => {
    toast.error("Email already in use !!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [formData, setData] = useState({
    fName: "",
    lName: "",
    Email: "",
    Password: "",
    key: "",
  });
  const changeHandler = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("user")) navigate("/dashboard");
  }, []);
  const [showLog, setShowLog] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const auth = getAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fName, lName, Email, Password, key } = formData;
      if(key!==import.meta.env.REACT_APP_VARIABLE){
        setShowInvalid(true)
        return
      }

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      const response = await axios.post(`${api}/auth/local/register`, {
        name: fName + " " + lName,
        username: fName + " " + lName,
        email: Email,
        password: Password,
        userRole: "Faculty",
      });
      setData({
        fName: "",
        lName: "",
        Email: "",
        Password: "",
        key: "",
      });
      setShowLog(true)
      setShowInvalid(false)
      handleCancel();

      toastifySuccess();
    } catch (error) {
      toastifyFailure()
      console.log(error);
    }
  };

  const addModalContent = (
    <form>
      <div>
        <label>First Name</label>
        <Input
          placeholder="Enter Your First Name"
          id="fName"
          onChange={changeHandler}
          required
          value={formData.fName}
        />
      </div>

      <div className="mt-3">
        <label>Last Name</label>
        <Input
          placeholder="Enter Your Last Name"
          id="lName"
          onChange={changeHandler}
          value={formData.lName}
          required
        />
      </div>
      <div className="mt-3">
        <label>Email</label>
        <Input
          placeholder="Enter Your Email"
          id="Email"
          onChange={changeHandler}
          value={formData.Email}
          required
        />
      </div>
      <div className="mt-3">
        <label>Password</label>
        <Input
          placeholder="Enter Your Password"
          id="Password"
          onChange={changeHandler}
          type="password"
          value={formData.Password}
          required
        />
      </div>
      <div className="mt-3">
        <label>Secret Key</label>
        <Input
          placeholder="Enter the Secret Key"
          id="key"
          onChange={changeHandler}
          type="password"
          value={formData.key}
          required
        />
      </div>

      {showInvalid && (
        <p className="text-red-500 text-sm ">The secret key is Invalid</p>
      )}
    </form>
  );
  return (
    <>
    <ToastContainer />
      <Modal
        title={<p className="text-center">Register as Faculty</p>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" className="mx-auto" onClick={onSubmit}>
            Sign Up
          </Button>,
        ]}
      >
        {addModalContent}
      </Modal>
      <div className="authContainer h-screen">
        <div className=" flex justify-between py-7 pl-20 w-full h-[20vh] pr-[15rem] ">
          <div>
            <img src={gctLogo} className="w-[5rem] compLog mr-3 inline-block" />
            <p className="text-2xl inline-block font-roboto">
              GCT Virtual Programming Laboratory
            </p>
          </div>
          {/* <h2 className="text-3xl tracking-wide">NetzeroThink</h2> */}
          <div className="w-[10rem] h-[2rem] sm:w-[18rem] sm:h-[3rem] mt-1 sm:mt-8 rounded-[30px] flex justify-between bg-violet-700 items-center px-[2px] relative">
            <button
              className={`text-white font-bold rounded-[30px] h-[90%] w-[50%]`}
              onClick={() => setShowLog(true)}
            >
              Login
            </button>
            <button
              className={` text-white font-bold rounded-[30px] w-[50%] h-[90%]`}
              onClick={() => setShowLog(false)}
            >
              Register{" "}
            </button>
            <button
              className={`bg-white transition-all ease-in-out duration-[400ms] text-violet-600 font-bold rounded-[30px] w-[50%] h-[90%] absolute ${
                !showLog ? "translate-x-[96.5%]" : ""
              }`}
            >
              {showLog ? "Login" : "Register"}
            </button>
          </div>
        </div>
        <div className="flex justify-between lg:flex-row flex-col lg:items-start items-center  px-[3rem]  w-full h-[80vh] ">
          <div className=" lg:w-[50%] w-full  h-[90%] relative bottom-5">
            {/* <img src={loginImg} className="logCartImg w-[2rem] h-[2rem]" alt =""/> */}
            <Player
              autoplay
              loop
              src={codeLottie}
              className="lg:w-[30rem] lg:h-[30rem] w-[70%] h-[20rem]   scale-x-[-1]"
            ></Player>
          </div>
          {showForgot ? (
            <ForgotForm
              sent={() => setShowForgot(false)}
              back={() => setShowForgot(false)}
            />
          ) : showLog ? (
            <Login
              forgot={() => {
                setShowForgot(true);
              }}
              login={(email) => props.login(email)}
            />
          ) : (
            <SignUp click={showModal} />
          )}
        </div>
      </div>
    </>
  );
};
export default Auth;
