import { ResponseData } from "@/types/api";
import { ChangePasswordResponse, LoginResponse } from "@/types/auth";
import { API } from "../fetch";
import { END_POINTS } from "../endpoint";

export const signIn = async (payload: {
    email: string;
    password: string;
}): Promise<ResponseData<LoginResponse>> => {
    const AuthApiInstance = new API();
    return AuthApiInstance.addPathName(END_POINTS.LOGIN)
        .post(payload)
        .then((res) => res.json());
};

export const validateToken = async (): Promise<ResponseData<boolean>> => {
    const AuthApiInstance = new API();
    return AuthApiInstance.addPathName(END_POINTS.CHECK_TOKEN)
        .post()
        .then((res) => res.json());
}

export const changePassword = async (payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<ResponseData<ChangePasswordResponse>> => {
    const api = new API();
    return api.addPathName(END_POINTS.CHANGE_PASSWORD)
        .post(payload)
        .then((res) => res.json());
};
