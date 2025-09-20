'use server'
import { FunctionsHttpError } from "@supabase/functions-js";
import { createClient } from "@/lib/supabase/server";

export const sendEmail = async function (to: string, subject: string, html: string) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set.');
    return { success: false, message: 'Server configuration error.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html },
    });

    if (error && error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    }
    if (error) {
      console.error('Error invoking Supabase function:', error);
      return { success: false, message: `Failed to send email: ${error.message}` };
    }

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Unexpected error calling Edge Function:', error);
    return { success: false, message: 'Failed to send email.' };
  }
}

