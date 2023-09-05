"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VerificationInput from "react-verification-input";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { PATHS } from "~/constants/paths";
import { COOKIES_TOKEN_KEY, COOKIES_REFRESH_KEY } from "~/constants/config";
import { setCookie } from "~/actions/cookie-actions";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useApiClient } from "~/hooks/useClient";

const styles = {
  container:
    "flex flex-col justify-center  items-center p-6 ml-16 gap-3 w-full md:w-2/3",
  title: "text-sky-900 text-xl md:text-2xl font-medium leading-loose mb-4",
  text: "text-sm",
  clearButton: "cursor-pointer",
  inputContainer: "flex flex-row items-center gap-3",
  button: "w-max place-self-end pr-10 bg-sky-500",
};

const isValidCode = (code) => {
  return code.length === 6;
};

const CodeInput = () => {
  const router = useRouter();

  const { post } = useApiClient();
  const [code, setCode] = useState("");

  const clearCode = () => {
    setCode("");
  };

  const onChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isValidCode(code)) {
        const email = sessionStorage.getItem("email");

        const { data } = await post(
          "/auth/login",
          { email, code },
          { cache: "no-store" }
        );

        await setCookie(COOKIES_TOKEN_KEY, data.jwt.accessToken);
        await setCookie(COOKIES_REFRESH_KEY, data.jwt.refreshToken);

        router.push(PATHS.HOME);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <p className={styles.title}>Login</p>
      <p className={styles.text}>
        To finalize your verification, please enter the code that has been sent
        to your email address / SMS
      </p>
      <div className={styles.inputContainer}>
        <VerificationInput
          autoFocus
          value={code}
          validChars="0-9"
          placeholder="*"
          onChange={onChange}
        />
        <CloseOutlinedIcon className={styles.clearButton} onClick={clearCode} />
      </div>
      <Button
        disabled={!isValidCode(code)}
        className={styles.button}
        variant="contained"
        type="submit"
      >
        SUBMIT
      </Button>
    </form>
  );
};

export default CodeInput;
