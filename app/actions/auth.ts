// Client-compatible auth utilities. Do not mark this file as a server module.

// Prefer NEXT_PUBLIC_API_URL for consistency with client-side usage, fallback to API_URL, then localhost
const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:5000/api/v1";

export interface SignupPayload {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface AuthResponse<TUser = unknown> {
	success: boolean;
	message?: string;
	user?: TUser;
	token?: string;
}

export interface GetUserResponse<TUser = unknown> {
	success: boolean;
	message?: string;
	data?: TUser;
}

function persistToken(token?: string | null) {
	if (!token) return;
	try {
		if (typeof window !== "undefined") {
			// Store in localStorage
			window.localStorage.setItem("ctm_token", token);
			// Also set a simple cookie for redundancy (non-HttpOnly)
			document.cookie = `ctm_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
		}
	} catch {
		// Ignore storage errors
	}
}

export function getStoredToken(): string | null {
	try {
		if (typeof window === "undefined") return null;
		const ls = window.localStorage.getItem("ctm_token");
		if (ls) return ls;
		const match = document.cookie.match(/(?:^|; )ctm_token=([^;]+)/);
		return match ? decodeURIComponent(match[1]) : null;
	} catch {
		return null;
	}
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
	try {
		const response = await fetch(`${apiUrl}/user-auth/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
			cache: "no-store",
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			return {
				success: false,
				message: data?.message || `Signup failed: ${response.status} ${response.statusText}`,
			};
		}

		// Persist token for subsequent requests
		persistToken(data?.token);

		// Store user.id in localStorage if present
		if (typeof window !== "undefined" && data?.user && data.user.id) {
			try {
				window.localStorage.setItem("ctm_user_id", data.user.id);
			} catch {
				// Ignore storage errors
			}
		}

		return {
			success: Boolean(data?.success ?? true),
			message: data?.message,
			user: data?.user,
			token: data?.token,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Signup failed",
		};
	}
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
	try {
		const response = await fetch(`${apiUrl}/user-auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
			cache: "no-store",
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			return {
				success: false,
				message: data?.message || `Login failed: ${response.status} ${response.statusText}`,
			};
		}

		// Persist token for subsequent requests
		persistToken(data?.token);

        // Store user.id in localStorage if present
		if (typeof window !== "undefined" && data?.user && data.user.id) {
			try {
				window.localStorage.setItem("ctm_user_id", data.user.id);
			} catch {
				// Ignore storage errors
			}
		}

		return {
			success: Boolean(data?.success ?? true),
			message: data?.message,
			user: data?.user,
			token: data?.token,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Login failed",
		};
	}
}

export async function getUserById<TUser = unknown>(userId: string, options?: { token?: string }): Promise<GetUserResponse<TUser>> {
	try {
		if (!userId) {
			return { success: false, message: "userId is required" };
		}

		const headers: Record<string, string> = { "Content-Type": "application/json" };
		if (options?.token) headers["Authorization"] = `Bearer ${options.token}`;

		const response = await fetch(`${apiUrl}/users/${userId}`, {
			method: "GET",
			headers,
			cache: "no-store",
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			return {
				success: false,
				message: data?.message || `Get user failed: ${response.status} ${response.statusText}`,
			};
		}

		return {
			success: Boolean(data?.success ?? true),
			message: data?.message,
			data: data?.data,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Get user failed",
		};
	}
}

// Backwards-compatible alias if needed in callers
export const signupAndStore = signup;


