const spaces = 2;

export const prettifyJSON = (response?: object) => {
  try {
    const prettified = JSON.stringify(response, null, spaces);
    return {
      response: prettified,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      response: JSON.stringify(response),
      error: true,
    };
  }
};
