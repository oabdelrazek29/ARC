import Vapi from "@vapi-ai/web";

const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

/** Null when Vapi is not configured — voice sessions require NEXT_PUBLIC_VAPI_WEB_TOKEN */
export const vapi = token ? new Vapi(token) : null;

export function isVapiConfigured() {
  return Boolean(token);
}
