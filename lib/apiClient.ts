import axios from "axios";
import { getCookie, removeCookie } from "./cookieUtils";

/* ===========================
   AXIOS INSTANCE
=========================== */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g. http://localhost:300/api
  headers: {
    "Content-Type": "application/json",
  },
 
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */

api.interceptors.request.use(
  (config) => {
    // ✅ Next.js safe
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
    const status = error?.response?.status;

    // 🔴 Unauthorized / Token expired
    if (status === 401 && typeof window !== "undefined") {
      // 🧹 Clear auth
      removeCookie("token", { path: "/" });
      localStorage.removeItem("user");

      // 🚫 Avoid infinite redirect loop
      const publicRoutes = ["/", "/login"];
      if (!publicRoutes.includes(window.location.pathname)) {
        window.location.replace("/");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
