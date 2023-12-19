interface IParamData {
  [key: string]: string;
}

export const getParsedQueryParam = (
  name: string,
  data: string | Array<string> | undefined
) => {
  if (data && typeof data === 'string') {
    try {
      const dataParsed = JSON.parse(decodeURIComponent(data)) as IParamData;
      return dataParsed;
    } catch (err) {
      return {
        error:
          err instanceof Error ? err.message : `Failed to parse ${name} JSON`,
        resp: undefined,
      };
    }
  } else return null;
};
