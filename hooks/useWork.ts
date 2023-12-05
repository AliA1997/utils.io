import { getGptResult } from "@utils/polling";
import { useEffect, useState } from "react";
import useServerClient from "@hooks/useServerClient";

function useWork(activeStepArg: number, generatorStepInWizard: number) {
  const [activeStep, setActiveStep] = useState(activeStepArg);
  const [workGuid, setWorkGuid] = useState<undefined | string>(undefined);
  const [workResult, setWorkResult] = useState<undefined | string>(undefined);
  const { serverClient } = useServerClient();

  useEffect(() => {
    if (workGuid && workResult && !workResult.includes(workGuid))
      setWorkResult(undefined);
    else if (workGuid && activeStep === generatorStepInWizard) {
      getGptResult(serverClient, workGuid, {
        setWorkResultUrl: setWorkResult,
        setResultData: setWorkResult,
      });
    }
  }, [workGuid]);

  const updateWorkHookActiveStep = (newStep: number) => setActiveStep(newStep);

  return { workGuid, setWorkGuid, workResult, setWorkResult, updateWorkHookActiveStep };
}

export default useWork;
