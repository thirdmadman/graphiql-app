const spaces = 2;

interface IPrettifyResponse {
  response: string;
  error?: string;
}

export const prettifyJSON = (response?: object): IPrettifyResponse => {
  try {
    const prettified = JSON.stringify(response, null, spaces);
    return {
      response: prettified,
    };
  } catch (error) {
    return {
      response: JSON.stringify(response),
      error: error instanceof Error ? error.message : '',
    };
  }
};
