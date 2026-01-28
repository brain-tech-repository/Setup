// import axios from "axios";
// import https from "https";

// console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },

// });
// export default api;



import axios from "axios";

import { getCookie, removeCookie } from "./cookieUtils";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 🔹 backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // 🔥 enable only if backend uses httpOnly cookies
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    // ✅ run only in browser (Next.js safe)
    if (typeof window !== "undefined") {
      const token = getCookie<string>("token");

      // 🔐 attach token automatically
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔴 token expired / invalid
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // 🧹 clear auth data
        removeCookie("token", { path: "/" });
        localStorage.removeItem("user_auth_data");

        // 🚫 prevent redirect loop
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
