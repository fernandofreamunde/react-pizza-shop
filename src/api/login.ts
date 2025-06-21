import { api } from "@/lib/axios";

export interface LoginBody {
  email: string;
}

export async function login({ email }: LoginBody) {
  await api.post("authenticate", { email });
}
