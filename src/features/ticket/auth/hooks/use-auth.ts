import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

import { User } from "@/generated/prisma/client";

import { getAuth } from "../queries/get-auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const { user } = await getAuth();
        if (isMounted) {
          setUser(user);
        }
      } finally {
        if (isMounted) {
          setIsFetched(true);
        }
      }
    };

    void fetchUser();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return { user, isFetched };
};

export { useAuth };
