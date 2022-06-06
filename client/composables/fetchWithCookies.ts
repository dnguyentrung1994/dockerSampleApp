export const fetchWithCookie = async (
  url: string,
  options: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
  },
  cookieName: string
) => {
  try {
    const response = await $fetch.raw(url, {
      ...options,
      credentials: "include",
    });
    console.log(response);
    if (process.server) {
      const cookies = Object.fromEntries(
        response.headers
          .get("set-cookie")
          ?.split(",")
          .map((a) => a.split("="))
      );
      console.log(cookies);
      if (cookieName in cookies) {
        useCookie(cookieName).value = cookies[`${cookieName}`];
      }
    }
    return {
      status: "OK",
      data: response._data,
      raw: response,
    };
  } catch (error) {
    return {
      status: "ERROR",
      data: error.data,
    };
  }
};
