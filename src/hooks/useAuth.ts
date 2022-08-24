import { useAtom } from "jotai";
import { useEffect } from "react";
import { authAtom } from "../atoms/authenticatedAtom";
import { supabase } from "../utils/supabaseClient";

export function useAuth() {
  const [session, setSession] = useAtom(authAtom);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const { data: { session } } = await supabase.auth.getSession()

      if (mounted) {
        console.log('getting session')
        if (session) {
          setSession({
            isAuthenticated: true,
            session
          })
        }
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

      setSession({
        session
      })

      if (event === 'SIGNED_OUT') {
        setSession({
          isAuthenticated: false,
          session: null
        })
      } else {
        setSession({
          isAuthenticated: true,
          session
        })
      }
    })

    return () => {
      mounted = false;
      subscription?.unsubscribe()
    }
  }, [])

}