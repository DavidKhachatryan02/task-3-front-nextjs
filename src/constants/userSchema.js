import * as yup from "yup";

export const userEmail = yup.string().email().required();
