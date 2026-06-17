"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  const pathname = usePathname();
  const checkedPathsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (checkedPathsRef.current.has(pathname)) {
      return;
    }
    checkedPathsRef.current.add(pathname);

    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
