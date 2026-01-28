"use client"
import api from "@/lib/apiClient";
import { setCookie } from "@/lib/cookieUtils";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// import { toast } from "sonner";
// import { authAPI } from "../api";


export const authAPI = {
	async login(payload: {
		email: string;
		password: string;
	}) {
		const res = await api.post("/login", payload);
		if (res.data.success) {
		const user = {
			id: res.data.user.id,
			name: res.data.user.name,
			//roleId: res.data.user.roleId, // backend से मिले roleId
		};

		// Save in sessionStorage
		sessionStorage.setItem("user", JSON.stringify(user));
		console.log(user);
		
	}

	return res.data;
		return res.data;
	},

	signUp: async (payload: {
		name: string;
		email: string;
		password: string;
	}) => {
		const res = await api.post("/register", payload);
		return res.data;
	},
};

export function useLogin() {
	const router = useRouter();
	const searchParams: any = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");
	console.log("Redirect To:", redirectTo);
	return useMutation({
		mutationFn: authAPI.login,

		onSuccess: (res) => {
				toast.success("Login Successfully");
				localStorage.setItem("user_auth_data", JSON.stringify(res));
				setCookie("token", res.token);
				if (redirectTo) {
					window.location.href = redirectTo as string;
				} else {
					window.location.href = "/dashboard";
				}
			},
			onError: (error) => {
				toast.error(`Something Went Wrong ${error}`);
			},
	});
}





