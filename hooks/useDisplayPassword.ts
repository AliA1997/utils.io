import { useEffect, useState } from "react";

const useDisplayPassword = (
  email: string
): {
  displayPassword: boolean;
  setDisplayPassword: (val: boolean) => void;
}  => {
  const [displayPassword, setDisplayPassword] = useState(false);

  useEffect(() => {
    if (!email) setDisplayPassword(false);
  }, [email]);

  return { displayPassword, setDisplayPassword };
};

export default useDisplayPassword;
