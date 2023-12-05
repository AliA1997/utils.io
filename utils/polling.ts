import { Client, ResultsResponse } from "@services/server-client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { GptStatuses } from "./prompt_mutations";
import axios from "axios";

async function poll(pollingConditionFunc: () => Promise<boolean>, timeout: number) {
  let timeoutGuid: NodeJS.Timeout[] = [];

  try {
    while (!(await pollingConditionFunc())) {
      await new Promise((resolve) => {
        timeoutGuid.push(setTimeout(resolve, timeout));
      });
    }
  } finally {
    if (timeoutGuid.length) {
      timeoutGuid.forEach(tmout => clearTimeout(tmout))
    }
  }
}

const getWorkResponseResult = (workResultResponse: any) => workResultResponse && workResultResponse.resultUrl && workResultResponse.resultUrl != '' ? true : false

export async function getGptResult(serverClient: Client, workGuid: string, setters: {
    setWorkResultUrl: Dispatch<SetStateAction<string | undefined>>,
    setResultData: (val: any) => void
  }) {
    try {

        await poll(async () => {
            const statusResponse = await serverClient.status(workGuid);
            console.log('workGuid!!', statusResponse);
            console.log('statusResponse.status === GptStatuses.Successful.toString()', statusResponse.status === GptStatuses.Successful.toString())
            //debugger;
            return statusResponse.status === GptStatuses.Successful.toString();
          }, 2000);
    
        let workResultResponse : ResultsResponse = new ResultsResponse();
        console.log('workGuid!!!!', workGuid);
        await poll(async() => {
          workResultResponse = await serverClient.results(workGuid);
          return getWorkResponseResult(workResultResponse);
        }, 2000);
          setters.setWorkResultUrl(workResultResponse.resultUrl!);
          const { data: { resultData } } = await axios.post('/api/openai/getResults', { resultUrl: workResultResponse!.resultUrl!}, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setters.setResultData(resultData);
    } catch(err) {
        debugger;
        console.log('error:', err);
    }
  }

export default poll;


