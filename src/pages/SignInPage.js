import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Input } from "../components/input";
import { auth } from "../components/firebasedata/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email adress")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    console.log("arr", arrErrors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  //   console.log(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Loggin Page";
    if (userInfo?.email) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={togglePassword ? "text" : "password"}
            placeholder="Enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            ) : (
              togglePassword && (
                <IconEyeOpen
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              )
            )}
          </Input>
        </Field>

        <div className="have-account">
          You haven't had an account{" "}
          <NavLink to={"/sign-up"}>Register an account</NavLink>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
