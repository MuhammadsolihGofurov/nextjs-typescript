function updateOptions(options: RequestInit, auth: boolean): RequestInit {
  const update: RequestInit = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Accept: "application/json",
    },
  };

  if (typeof localStorage !== "undefined" && localStorage.auth__key && auth) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.auth__key}`,
    };
  }

  return update;
}

export default async function fetcher(
  url: string = "",
  options: RequestInit = {},
  params: { [key: string]: any } = {},
  auth: boolean = false
): Promise<any> {
  const __url = new URL(process.env.API + url);
  Object.keys(params).forEach((key) =>
    __url.searchParams.append(key, params[key])
  );

  const response = await fetch(__url.toString(), updateOptions(options, auth));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
