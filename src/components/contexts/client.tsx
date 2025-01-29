import Cookies from "js-cookie";

export const set_logged_in = () => 
{
  Cookies.set("is_logged_in", "true");
}

export const set_logged_out = () => 
{
  Cookies.remove("is_logged_in");
};

