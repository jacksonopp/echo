import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

export interface AuthSession {
  session: Session | null;
  isAuthenticated?: boolean;
}

export const isAuthenticatedAtom = atom(false);
export const userSessionAtom = atom<Session | null>(null);
export const authAtom = atom(
  (get) => ({
    isAuthenticated: get(isAuthenticatedAtom),
    userSession: get(userSessionAtom),
  }),
  (get, set, update: AuthSession) => {
    const isAuthenticated = update.isAuthenticated ?? get(isAuthenticatedAtom);

    set(isAuthenticatedAtom, isAuthenticated);
    set(userSessionAtom, update.session);
  }
)