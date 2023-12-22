import { gqlFetchApi } from '../fetchGraphQl';

export interface IIntrospectionResponse {
  __schema: IIntrospectionSchema;
}

export interface IIntrospectionSchema {
  queryType?: IQueryType;
  mutationType?: IMutationType;
  types: Array<Type>;
  directives: Array<IDirectives>;
  description: string;
}

export interface IQueryType {
  name: string;
}

export interface IMutationType {
  name: string;
}

export interface IDirectives {
  name: string;
  locations: Array<string>;
  args: Array<Arg>;
}

export interface Type {
  kind: string;
  name: string;
  fields?: Array<Field>;
  inputFields?: Array<InputField>;
  interfaces?: Array<string>;
  enumValues?: Array<EnumValue>;
  possibleTypes: [];
}

export interface Arg {
  name: string;
  type: TypeType;
  defaultValue?: string;
  description?: string;
}

export interface Field {
  name: string;
  args: Array<Arg>;
  type: TypeType;
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface InputField {
  name: string;
  type: TypeType;
  defaultValue?: string;
}

export interface EnumValue {
  name: string;
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface TypeType {
  kind: string;
  name?: string;
  ofType?: TypeType2;
}

export interface TypeType2 {
  kind: string;
  name?: string;
  ofType?: TypeType3;
}

export interface TypeType3 {
  kind: string;
  name?: string;
  ofType?: TypeType4;
}

export interface TypeType4 {
  kind: string;
  name: string;
  ofType: TypeType5;
}

export interface TypeType5 {
  kind: string;
  name?: string;
  ofType?: TypeType6;
}

export interface TypeType6 {
  kind: string;
  name?: string;
  ofType?: TypeType7;
}

export interface TypeType7 {
  kind: string;
  name?: string;
  ofType?: TypeType8;
}

export interface TypeType8 {
  kind: string;
  name?: string;
  ofType?: TypeType9;
}

export interface TypeType9 {
  kind: string;
  name?: string;
}

export const gqlIntrospectionQuery = `
query IntrospectionQuery {
  __schema {
    description
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description

      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description

  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getGqlIntrospection = async (url: string, headers = {}) => {
  const resp = await gqlFetchApi(url, gqlIntrospectionQuery, headers);

  if (resp.error) {
    return { error: resp.error };
  }

  return { schema: resp.resp as IIntrospectionResponse };
};
