export type Maybe<T> = null | undefined | T;

export enum DirectiveLocation {
  /** Request Definitions */
  QUERY = 'QUERY',
  MUTATION = 'MUTATION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FIELD = 'FIELD',
  FRAGMENT_DEFINITION = 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD = 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT = 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION = 'VARIABLE_DEFINITION',
  /** Type System Definitions */
  SCHEMA = 'SCHEMA',
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  FIELD_DEFINITION = 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION = 'ARGUMENT_DEFINITION',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  ENUM_VALUE = 'ENUM_VALUE',
  INPUT_OBJECT = 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION = 'INPUT_FIELD_DEFINITION',
}

export interface IntrospectionEnumValue {
  name: string;
  description?: Maybe<string>;
  isDeprecated: boolean;
  deprecationReason: Maybe<string>;
}

export interface IntrospectionScalarType {
  kind: 'SCALAR';
  name: string;
  description?: Maybe<string>;
  specifiedByURL?: Maybe<string>;
}

export type IntrospectionOutputType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType;

export type IntrospectionOutputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionOutputType>
  | IntrospectionListTypeRef<IntrospectionOutputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionOutputType>
      | IntrospectionListTypeRef<IntrospectionOutputTypeRef>
    >;

export type IntrospectionInputType =
  | IntrospectionScalarType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export type IntrospectionInputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionInputType>
  | IntrospectionListTypeRef<IntrospectionInputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionInputType>
      | IntrospectionListTypeRef<IntrospectionInputTypeRef>
    >;

export interface IntrospectionField {
  name: string;
  description?: Maybe<string>;
  args: Array<IntrospectionInputValue>;
  type: IntrospectionOutputTypeRef;
  isDeprecated: boolean;
  deprecationReason: Maybe<string>;
}
export interface IntrospectionInputValue {
  name: string;
  description?: Maybe<string>;
  type: IntrospectionInputTypeRef;
  defaultValue: Maybe<string>;
  isDeprecated?: boolean;
  deprecationReason?: Maybe<string>;
}

export interface IntrospectionObjectType {
  kind: 'OBJECT';
  name: string;
  description?: Maybe<string>;
  fields: Array<IntrospectionField>;
  interfaces: Array<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
}

export interface IntrospectionInterfaceType {
  kind: 'INTERFACE';
  name: string;
  description?: Maybe<string>;
  fields: Array<IntrospectionField>;
  interfaces: Array<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
  possibleTypes: Array<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
}

export interface IntrospectionUnionType {
  kind: 'UNION';
  name: string;
  description?: Maybe<string>;
  possibleTypes: Array<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
}

export interface IntrospectionEnumType {
  kind: 'ENUM';
  name: string;
  description?: Maybe<string>;
  enumValues: Array<IntrospectionEnumValue>;
}

export interface IntrospectionInputObjectType {
  kind: 'INPUT_OBJECT';
  name: string;
  description?: Maybe<string>;
  inputFields: Array<IntrospectionInputValue>;
}

export type IntrospectionTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef<
      IntrospectionNamedTypeRef | IntrospectionListTypeRef
    >;

export interface IntrospectionListTypeRef<
  T extends IntrospectionTypeRef = IntrospectionTypeRef,
> {
  kind: 'LIST';
  ofType: T;
}

export interface IntrospectionNonNullTypeRef<
  T extends IntrospectionTypeRef = IntrospectionTypeRef,
> {
  kind: 'NON_NULL';
  ofType: T;
}

export type IntrospectionType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export interface IntrospectionNamedTypeRef<
  T extends IntrospectionType = IntrospectionType,
> {
  kind: T['kind'];
  name: string;
}

export interface IntrospectionDirective {
  name: string;
  description?: Maybe<string>;
  isRepeatable?: boolean;
  locations: Array<DirectiveLocation>;
  args: Array<IntrospectionInputValue>;
}

export interface IntrospectionSchema {
  description?: Maybe<string>;
  queryType: IntrospectionNamedTypeRef<IntrospectionObjectType>;
  mutationType: Maybe<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
  subscriptionType: Maybe<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
  types: Array<IntrospectionType>;
  directives: Array<IntrospectionDirective>;
}

export interface IntrospectionResponse {
  __schema: IntrospectionSchema;
}
