import { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-500 h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80  text-center p-2 h-max px-4">
          <Heading lable={"Sign in"} />
          <Subheading label={"Enter your credenttials to acces your accout"} />
          <Inputbox
            label={"Email"}
            placeholder={"Arvind@gmail.com"}
            onchange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Inputbox
            label={"Passowrd"}
            placeholder={"123456"}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:4000/api/v1/user/signin",
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
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
