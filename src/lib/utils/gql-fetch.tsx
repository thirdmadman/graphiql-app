interface IHeaders {
  [key: string]: string;
}

export interface IVariables {
  [key: string]: string;
}

interface IResponseBody<T> {
  data?: T;
  errors?: Array<{ message?: string }>;
}

export async function gqlFetchApi<T extends object>(
  url: string,
  gqlRequest: string,
  headers: IHeaders | null = null,
  variables: IVariables | null = null
) {
  try {
    if (!url || !gqlRequest) {
      return { error: 'URL or request parameters are required' };
    }

    const requestHeaders = {
      'content-type': 'application/json',
      ...headers,
    };

    const requestBody = {
      query: gqlRequest,
      variables: { ...variables },
    };

    const options = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    };

    const responseBody = (await (
      await fetch(url, options)
    ).json()) as IResponseBody<T>;

    if (!responseBody || !responseBody?.data) {
      return { error: 'Server response is empty' };
    }

    if (responseBody?.errors && responseBody?.errors.length > 0) {
      if (responseBody?.errors[0]?.message) {
        return { error: responseBody?.errors[0]?.message };
      } else {
        return { error: 'Server response contains errors' };
      }
    }

    return { resp: responseBody.data };
  } catch (err) {
    console.error('ERROR DURING FETCH REQUEST', err);
    return { error: 'ERROR DURING FETCH REQUEST' };
  }
}
