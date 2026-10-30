import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { api } from "../api";

export function useSyncUser() {
  const { isLoaded, user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function sync() {
      try {
        await api.get(`/users/${user.id}`);
      } catch (err) {
        if (err.status !== 404) return console.error(err);
        try {
          await api.post("/users", {
            id: user.id,
            name: user.fullName || undefined,
            email: user.primaryEmailAddress?.emailAddress,
            avatar: user.imageUrl,
          });
        } catch (e) {
          console.error(e);
        }
      }
    }

    sync();
  }, [isLoaded, userId]); // eslint-disable-line react-hooks/exhaustive-deps
}
