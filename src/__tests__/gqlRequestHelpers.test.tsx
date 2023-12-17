import { prettifyQuery, minifyQuery } from '@/lib/utils/gql-formatter';

const mockQuery = `fragment FullType on __Type {
  kind
  name
  fields(includeDeprecated: true) {
    name
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
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
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
              }
            }
          }
        }
      }
    }
  }
}

query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      locations
      args {
        ...InputValue
      }
    }
  }
}`;

const unformattedMockQuery = `
fragment FullType on __Type {
  kind name
  fields(includeDeprecated: true) {
    name
    args {
      ...InputValue}
    type {...TypeRef}
    isDeprecated deprecationReason
  }
  inputFields {
    ...InputValue
  } interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment 
InputValue 
on __InputValue {
  name
  type {   ...TypeRef}
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType 
{
    kind
    name ofType {
      kind
      name
      ofType {kind 
  name
  ofType {
    kind name
          ofType {
            kind name
            ofType {
              kind name
              ofType {kind name}}}
}}}}}
query IntrospectionQuery {
  __schema {
    queryType {name}
    mutationType {
      name }
    types 
    {
      ...FullType
    }
    directives { name
      locations
      args {...InputValue}}}
}`;

describe('MinifyQuery', () => {
  test('minifyQuery should minify the query string', () => {
    const minified = minifyQuery(mockQuery);
    const expectedResult =
      'fragment FullType on __Type{kind name fields(includeDeprecated:true){name args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}}query IntrospectionQuery{__schema{queryType{name}mutationType{name}types{...FullType}directives{name locations args{...InputValue}}}}';

    expect(minified).toEqual(expectedResult);
  });
});

describe('PrettifyQuery', () => {
  test('prettifyQuery should format the query string', () => {
    const prettified = prettifyQuery(unformattedMockQuery);

    expect(prettified).toEqual(mockQuery);
  });
});
