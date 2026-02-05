"use client";

import api from "@/lib/apiClient";
import { setCookie } from "@/lib/cookieUtils";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

/* =======================
   API
======================= */

export const authAPI = {
  login: async (payload: { email: string; password: string }) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },

  signUp: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },
};

/* =======================
   LOGIN HOOK
======================= */

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return useMutation({
    mutationFn: authAPI.login,

    onSuccess: (res) => {
      const { token, user } = res;

      // ✅ Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Optional cookie (if you need SSR)
      setCookie("token", token);

      toast.success("Login successful");

      // ✅ Redirect
      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        router.replace("/dashboard");
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });
}
