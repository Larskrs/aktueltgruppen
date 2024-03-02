import { createClient } from '@supabase/supabase-js'

export function GetClient (schema="public") {
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        {
            db: {
                schema: schema,
            },
        },
    )

    return client;
}
export function GetServiceClient (schema="public") {
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,

        {
            db: {
                schema: schema,
            },
        },
    )

    return client;
}

export function getSessionClient(session) {
    
    const { supabaseAccessToken } = session
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            global: {
              headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
              },
            },
          }
    )

}







