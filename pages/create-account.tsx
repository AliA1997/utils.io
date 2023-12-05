import { useRouter } from "next/router";
import UtilsIoModals from "@common/Modals/UtilsIoModals";

const CreateAccount = () => {
  const router = useRouter();
  return (
    <div>
      <UtilsIoModals />  
    </div>
  );
};

export default CreateAccount;
