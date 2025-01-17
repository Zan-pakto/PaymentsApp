import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export const Signup = () => {
  const [FirstName, setfirstname] = useState("");
  const [LastName, setlastname] = useState("");
  const [UserName, setEmail] = useState("");
  const [Password, setpassowrd] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading lable={"Sign up"} />
          <Subheading label={"Enter your info to create your account"} />
          <Inputbox
            onchange={(e) => {
              setfirstname(e.target.value);
            }}
            label={"First Name"}
            placeholder={"jhon"}
          />
          <Inputbox
            onchange={(e) => {
              setlastname(e.target.value);
            }}
            label={"Second name"}
            placeholder={"Doe"}
          />
          <Inputbox
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            placeholder={"Arvind555@gmail.com"}
          />
          <Inputbox
            onchange={(e) => {
              setpassowrd(e.target.value);
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:4000/api/v1/user/signup",
                  {
                    UserName,
                    FirstName,
                    LastName,
                    Password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
