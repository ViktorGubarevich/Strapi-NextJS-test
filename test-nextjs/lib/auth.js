import Router from "next/router";
import Cookies from "js-cookie";
import { fetcher } from "./api";

//LOG IN
export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    Router.reload("/");
  }
};

//LOG OUT
export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  Router.reload("/");
};

//LOCAL COOKIE

export const getUserFromLocalCookie = () => {
  return Cookies.get('username');
};