export const allQueries = [
  {
    name: 'characters',
    description: 'Get the list of all characters',
    args: [],
    type: {
      kind: 'OBJECT',
      name: 'Characters',
      ofType: null,
    },
    isDeprecated: false,
    deprecationReason: null,
  },
];

export const userType = {
  kind: 'OBJECT',
  name: 'User',
  description: 'A user',
  fields: [
    {
      name: 'id',
      description: 'The id of the user',
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'SCALAR',
          name: 'Int',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
    {
      name: 'name',
      description: 'The name of the user',
      args: [],
      type: {
        kind: 'NON_NULL',
        name: null,
        ofType: {
          kind: 'SCALAR',
          name: 'String',
          ofType: null,
        },
      },
      isDeprecated: false,
      deprecationReason: null,
    },
  ],
  inputFields: null,
  interfaces: [],
  enumValues: null,
  possibleTypes: null,
};

export const allMutations = [
  {
    name: 'UpdateUser',
    description: null,
    args: [],
    type: {
      kind: 'OBJECT',
      name: 'User',
      ofType: null,
    },
    isDeprecated: false,
    deprecationReason: null,
  },
];

export const allSubscriptions = [
  {
    name: 'users_by_pk',
    description: 'fetch data from the table: "users" using primary key columns',
    args: [
      {
        name: 'id',
        description: null,
        type: {
          kind: 'NON_NULL',
          name: null,
          ofType: {
            kind: 'SCALAR',
            name: 'uuid',
            ofType: null,
          },
        },
        defaultValue: null,
      },
    ],
    type: {
      kind: 'OBJECT',
      name: 'users',
      ofType: null,
    },
    isDeprecated: false,
    deprecationReason: null,
  },
];

export const scalarType = {
  kind: 'SCALAR',
  name: 'ID',
  description:
    'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
  fields: null,
  inputFields: null,
  interfaces: null,
  enumValues: null,
  possibleTypes: null,
};

export const mockGqlSchemaIntrospection = {
  queryType: {
    name: 'Query',
  },
  mutationType: {
    name: 'Mutation',
  },
  subscriptionType: { name: 'Subscription' },
  types: [
    {
      kind: 'OBJECT',
      name: 'Query',
      description: '',
      fields: allQueries,
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },
    scalarType,
    {
      kind: 'OBJECT',
      name: 'Mutation',
      description: null,
      fields: allMutations,
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },
    userType,
    {
      kind: 'OBJECT',
      name: 'Characters',
      description: '',
      fields: [
        {
          name: 'info',
          description: '',
          args: [],
          type: {
            kind: 'OBJECT',
            name: 'Info',
            ofType: null,
          },
          isDeprecated: false,
          deprecationReason: null,
        },
        {
          name: 'results',
          description: '',
          args: [],
          type: {
            kind: 'LIST',
            name: null,
            ofType: {
              kind: 'OBJECT',
              name: 'Character',
              ofType: null,
            },
          },
          isDeprecated: false,
          deprecationReason: null,
        },
      ],
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },
    {
      kind: 'OBJECT',
      name: 'Subscription',
      description: null,
      fields: allSubscriptions,
      inputFields: null,
      interfaces: [],
      enumValues: null,
      possibleTypes: null,
    },
  ],
  directives: [
    {
      name: 'skip',
      description:
        'Directs the executor to skip this field or fragment when the `if` argument is true.',
      locations: ['FIELD', 'FRAGMENT_SPREAD', 'INLINE_FRAGMENT'],
      args: [
        {
          name: 'if',
          description: 'Skipped when true.',
          type: {
            kind: 'NON_NULL',
            name: null,
            ofType: {
              kind: 'SCALAR',
              name: 'Boolean',
              ofType: null,
            },
          },
          defaultValue: null,
        },
      ],
    },
    {
      name: 'deprecated',
      description:
        'Marks an element of a GraphQL schema as no longer supported.',
      locations: ['FIELD_DEFINITION', 'ENUM_VALUE'],
      args: [
        {
          name: 'reason',
          description:
            'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).',
          type: {
            kind: 'SCALAR',
            name: 'String',
            ofType: null,
          },
          defaultValue: '"No longer supported"',
        },
      ],
    },
  ],
};
