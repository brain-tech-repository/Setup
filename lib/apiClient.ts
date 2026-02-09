"use client"
import axios from "axios";
import { getCookie, removeCookie } from "./cookieUtils";

/* ===========================
   AXIOS INSTANCE
=========================== */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */

api.interceptors.request.use(
  (config) => {
    // ✅ SSR-safe
    if (typeof window !== "undefined") {
      const token = getCookie<string>("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // ✅ HARD GUARD — MUST BE FIRST
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const status = error?.response?.status;

    if (status === 401) {
      // 🧹 Clear auth (browser only)
      removeCookie("token", { path: "/" });

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("user");
      }

      // 🚫 Prevent redirect loop
      const publicRoutes = ["/", "/login"];
      if (!publicRoutes.includes(window.location.pathname)) {
        window.location.replace("/");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
