import { FinishAccountDataToSetup } from "@auth/FinishAccountModal";
import {
  CurrentUtilsIOSubscriptionData,
  CurrentUtilsIOSubscriptions,
  CurrentUtilsIOVerifyCodeData,
} from "@redux/reducers/authSlice";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { AxiosResponse } from "axios";
import add from "date-fns/add";
import { Configuration, CreateChatCompletionRequest, CreateChatCompletionResponse, OpenAIApi } from "openai";

export function initializeSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

export function initializeOpenAiClient(): OpenAIApi {
  const configuration = new Configuration({
    organization: process.env.OPEN_AI_API_ORGANIZATION,
    apiKey: process.env.OPEN_AI_API_KEY,
  });
  return new OpenAIApi(configuration);
}

export function generateVerificationCode(): string {
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (inclusive)

  // Generate a random number between min and max
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  // Convert the code to a string and pad with zeros if necessary
  const paddedCode = code.toString().padStart(6, "0");

  return paddedCode;
}

export interface VerifyCodeDbData {
  id: number;
  created_at: Date;
  expire_time: Date;
  used: boolean;
  user_subscription_id: number;
  updated_at: Date;
}

export async function getVerifyCodeDataFromDb(
  supabase: SupabaseClient,
  userSubscriptionId: number
): Promise<
  | {
      [x: string]: any;
    }
  | undefined
> {
  const { data: verifyCodeData } = await supabase
    .from("verification_code")
    .select()
    .eq("user_subscription_id", userSubscriptionId)
    .single();

  return verifyCodeData ? verifyCodeData : undefined;
}

export async function upserUserSubscriptionToDb(
  supabase: SupabaseClient,
  userData: FinishAccountDataToSetup
): Promise<{
  [x: string]: any;
}> {
  const {
    username,
    dob,
    country_of_residence,
    created_at,
    avatar,
    last_logged_in,
  } = userData;

  const { data: userSubscriptionInserted } = await supabase
    .from("user_subscriptions")
    .select()
    .eq("username", username)
    .single();

  if (userSubscriptionInserted) {
    await supabase
      .from("user_subscriptions")
      .update({
        username,
        dob,
        country_of_residence,
        created_at,
        avatar,
        last_logged_in,
      })
      .eq("id", userSubscriptionInserted.id);
    return { ...userData, id: userSubscriptionInserted.id };
  } else {
    const { data: userSubscription, error } = await supabase
      .from("user_subscriptions")
      .insert({
        username,
        dob,
        country_of_residence,
        created_at,
        avatar,
        last_logged_in,
      })
      .select()
      .single();

    return userSubscription!;
  }
}

export async function upsertVerifyCodeToDb(
  supabase: SupabaseClient,
  userSubscriptionId: number,
  code: string
): Promise<VerifyCodeDbData> {
  const updatedExpireTime = add(new Date(), { weeks: 2 });
  const verifyCodeData = await getVerifyCodeDataFromDb(
    supabase,
    userSubscriptionId
  );

  if (verifyCodeData) {
    const { data: updatedVerifyCodeData } = await supabase
      .from("verification_code")
      .update({
        code,
        updated_at: new Date(),
        expire_time: updatedExpireTime,
        used: false,
      })
      .eq("user_subscription_id", userSubscriptionId)
      .select()
      .single();

    return updatedVerifyCodeData as VerifyCodeDbData;
  } else {
    const { data: insertedVerifyCodeData, error } = await supabase
      .from("verification_code")
      .insert({
        user_subscription_id: userSubscriptionId,
        code,
        used: false,
        created_at: new Date(),
        expire_time: updatedExpireTime,
      })
      .select()
      .single();

      return insertedVerifyCodeData as VerifyCodeDbData;
  }
}

export function generateVerificationCodeEmail(
  userData: FinishAccountDataToSetup,
  code: string,
  reVerifyingAccount?: boolean
): string {
  return `
        <!DOCTYPE html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <style>
                 @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
                </style> 
            </head>
            <body>
                <div style="-moz-user-select:none; -ms-flex-align:center; -ms-flex-negative:0; -ms-flex-pack:center; -ms-user-select:none; -webkit-align-items:center; -webkit-box-align:center; -webkit-box-pack:center; -webkit-flex-shrink:0; -webkit-justify-content:center; -webkit-user-select:none; align-items:center; background-color:#000; border-radius:50%; display:flex; flex-shrink:0; font-family:"Roboto", "Helvetica", "Arial", sans-serif; font-size:1.25rem; height:200px; justify-content:center; line-height:1; margin-bottom:16px; overflow:hidden; position:relative; user-select:none; width:200px; -ms-flex-direction:column; -webkit-flex-direction:column; flex-direction:column; margin-top:16px">
                    <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />      
                    <div>
                        <h4 style="color:#000; font-family:Verdana; font-size:2.125rem; font-weight:700; letter-spacing:0.00735em; line-height:1.235; margin:0; margin-bottom:24px;">
                            Welcome
                            <a style="text-decoration: none; color: #000;" href="mailto:${
                              userData.username
                            }" target="_blank">${userData.username}</a>        
                        </h4>
                        <div style="-moz-user-select:none; -ms-flex-align:center; -ms-flex-negative:0; -ms-flex-pack:center; -ms-user-select:none; -webkit-align-items:center; -webkit-box-align:center; -webkit-box-pack:center; -webkit-flex-shrink:0; -webkit-justify-content:center; -webkit-user-select:none; align-items:center; background-color:#000; border-radius:50%; display:flex; flex-shrink:0; font-family:"Roboto", "Helvetica", "Arial", sans-serif; font-size:1.25rem; height:200px; justify-content:center; line-height:1; margin-bottom:40px; overflow:hidden; position:relative; user-select:none; width:200px;">
                            <img 
                                alt="${userData.username} Avatar" 
                                src="${userData.avatar}}" 
                                style="object-fit:cover; text-align:center; text-indent:10000px;"
                            />
                        </div>
                        <h5 style="color:#000; font-family:Verdana; font-size:1.75rem; font-weight:700; letter-spacing:0.00735em; line-height:1.235; margin:0; margin-bottom:24px">
                            You need to verify your account
                        </h5>
                        <p style="color:#000; font-family:Verdana; font-size:1.125rem; font-weight:400; letter-spacing:0.00735em; line-height:1.235; margin:0; margin-bottom:24px;">
                            This is your verifcation code:
                        </p>
                        <p  style="color:#000; font-family:Verdana; font-size:1.125rem; font-weight:400; letter-spacing:0.00735em; line-height:1.235; margin:0; margin-bottom:24px;">
                            <b>${code}</b>
                        </p>
                    </div>
                    <p  style="color:#000; font-family:Verdana; font-size:1.125rem; font-weight:400; letter-spacing:0.00735em; line-height:1.235; margin:0; margin-bottom:24px;">
                        Can verify your account by typing your code in the verification code field.
                    </p>
                    <img 
                        alt="Verification Code Input Image" 
                        src="${
                          reVerifyingAccount
                            ? "https://res.cloudinary.com/aa1997/image/upload/v1686982670/activate_account.png"
                            : "https://res.cloudinary.com/aa1997/image/upload/v1686982433/secure_your_account.png"
                        }" 
                        style="object-fit:cover; text-align:center; text-indent:10000px;"
                    />
                </div>
            </body>
        </html>
    `;
}


export function convertVerifiedSubToReduxData(userSubscription: any, planName: string): CurrentUtilsIOSubscriptionData {
  return {
    id: userSubscription?.id,
    username: userSubscription.username,
    avatar: userSubscription.avatar,
    countryOfResidence: userSubscription.country_of_residence,
    lastLoggedIn: userSubscription.last_logged_in,
    serviceLastUsed: userSubscription.service_last_used,
    basicRequestsLeft: userSubscription.basic_requests_left,
    web3RequestsLeft: userSubscription.web3_requests_left,
    chatbotRequestsLeft: userSubscription.chatbot_requests_left,
    createdAt: userSubscription.created_at,
    dob: userSubscription.dob,
    activated: userSubscription.activated,
    tokensUsed: userSubscription.tokens_used,
    trialFinished: userSubscription.trial_finished,
    subscription: CurrentUtilsIOSubscriptions[planName as keyof typeof CurrentUtilsIOSubscriptions],
  }
}
export function convertSubAndCodeToReduxData(
  userSubscription: any,
  code: any
): [CurrentUtilsIOSubscriptionData, CurrentUtilsIOVerifyCodeData] {
  return [
    {
      id: userSubscription?.id,
      username: userSubscription.username,
      avatar: userSubscription.avatar,
      countryOfResidence: userSubscription.country_of_residence,
      lastLoggedIn: userSubscription.last_logged_in,
      createdAt: userSubscription.created_at,
      dob: userSubscription.dob,
      activated: userSubscription.activated,
      tokensUsed: userSubscription.tokens_used,
    },
    {
      expireTime: code.expire_time,
      used: code.used,
    },
  ];
}

function isCountryInEU(countryName: string): boolean {
  const euCountries: string[] = [
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Republic of Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
  ];

  return euCountries.includes(countryName);
}

export enum PlanType {
  BASIC = "Basic",
  WEB3 = "Web3",
  CHATBOT = "Chatbot",
}

function getPlanTypeKey(planName: string): string {
  const planType = PlanType[planName.toUpperCase() as keyof typeof PlanType];
  switch (planType) {
    case PlanType.BASIC:
      return "STRIPE_BASIC";
    case PlanType.WEB3:
      return "STRIPE_WEB3";
    case PlanType.CHATBOT:
      return "STRIPE_CHATBOT";
    default:
      return "";
  }
}

export function getPriceId(
  countryName: string,
  planName: string
): string | undefined {
  let processEnvKey = "";
  
  if (isCountryInEU(countryName))
    processEnvKey = getPlanTypeKey(planName) + "_EURO_PRICE";
  switch (countryName) {
    case "China":
      processEnvKey = getPlanTypeKey(planName) + "_CHINA_PRICE";
      break;
    case "Lebanon":
      processEnvKey = getPlanTypeKey(planName) + "_LEBANON_PRICE";
      break;
    case "Malaysia":
      processEnvKey = getPlanTypeKey(planName) + "_LEBANON_PRICE";
      break;
    case "Saudi Arabia":
      processEnvKey = getPlanTypeKey(planName) + "_SAUDI_ARABIA_PRICE";
      break;
    case "United Arab Emirates":
      processEnvKey = getPlanTypeKey(planName) + "_UAE_PRICE";
      break;
    default:
      processEnvKey = getPlanTypeKey(planName) + "_USA_PRICE";
      break;
  }
  return process.env[processEnvKey];
}

export function getProductId(planName: string): string | undefined {
  const planType = PlanType[planName as keyof typeof PlanType];
  if (planType === PlanType.WEB3) return process.env.STRIPE_WEB3_PRODUCT_ID;
  if (planType === PlanType.CHATBOT)
    return process.env.STRIPE_CHATBOT_PRODUCT_ID;
  return process.env.STRIPE_BASIC_PRODUCT_ID;
}

export interface UtilsIOGetPromptArgs {
  prompt: string;
  maxTokens: number;
  temperature?: number;
  topP?: number;
}
export function getPrompt(args: UtilsIOGetPromptArgs) {
  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content: args.prompt,
      },
    ],
    temperature: args.temperature ?? 0,
    max_tokens: args.maxTokens,
    top_p: args.temperature ?? 0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  } as CreateChatCompletionRequest;
}
export function isOpenAiResponseValid(responseData: CreateChatCompletionResponse) {
  return (responseData && responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message);
}