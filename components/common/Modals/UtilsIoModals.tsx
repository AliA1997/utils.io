import Login from "../../auth/LoginModal";
import Register from "../../auth/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { UtilsIoStore } from "@redux/reducers";
import { setOpenLogin, setOpenSignup } from "@redux/reducers/modalSlice";
import FinishAccountModal from "@auth/FinishAccountModal";
import ActivateAccountModal from "@auth/ActivateAccountModal";
import SelectPlanModal from "@auth/SelectPlanModal";
import { useRouter } from "next/router";

export default function UtilsIoModals() {
  const {
    openLogin,
    openSignup,
    openStripe,
    openActivateAccount,
    openSelectPlan,
    openFinishAccount,
  } = useSelector((state: UtilsIoStore) => state.modal);
  const dispatch = useDispatch();
  const router = useRouter();
  const signupOpen = (val: boolean) => dispatch(setOpenSignup(val));
  const loginOpen = (val: boolean) => dispatch(setOpenLogin(val));

  return (
    <>
      <Login
        open={openLogin}
        setOpen={loginOpen}
        setSignupOpen={signupOpen}
      />
      {openSignup && <Register setOpen={signupOpen}  setLoginOpen={loginOpen} />}
      {openActivateAccount && <ActivateAccountModal />}
      {openFinishAccount && <FinishAccountModal />}
      {openSelectPlan && <SelectPlanModal />}
    </>
  );
}
