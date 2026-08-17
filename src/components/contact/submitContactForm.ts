export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  message: string;
}

/**
 * No backend or serverless endpoint is connected yet. This function exists so
 * the form component doesn't need to change when one is: swap the body for a
 * real `fetch()` call to an API route.
 */
export async function submitContactForm(_payload: ContactPayload): Promise<ContactResult> {
  return {
    ok: false,
    message: "This form isn't connected to a live endpoint yet — email directly for now.",
  };
}
