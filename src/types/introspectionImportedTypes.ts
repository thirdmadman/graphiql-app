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

export interface IIntrospectionEnumValue {
  name: string;
  description?: Maybe<string>;
  isDeprecated: boolean;
  deprecationReason: Maybe<string>;
}

export interface IIntrospectionScalarType {
  kind: 'SCALAR';
  name: string;
  description?: Maybe<string>;
  specifiedByURL?: Maybe<string>;
}

export type TIntrospectionOutputType =
  | IIntrospectionScalarType
  | IIntrospectionObjectType
  | IIntrospectionInterfaceType
  | IIntrospectionUnionType
  | IIntrospectionEnumType;

export type TIntrospectionOutputTypeRef =
  | IIntrospectionNamedTypeRef<TIntrospectionOutputType>
  | IIntrospectionListTypeRef<TIntrospectionOutputTypeRef>
  | IIntrospectionNonNullTypeRef<
      | IIntrospectionNamedTypeRef<TIntrospectionOutputType>
      | IIntrospectionListTypeRef<TIntrospectionOutputTypeRef>
    >;

export type TIntrospectionInputType =
  | IIntrospectionScalarType
  | IIntrospectionEnumType
  | IIntrospectionInputObjectType;

export type TIntrospectionInputTypeRef =
  | IIntrospectionNamedTypeRef<TIntrospectionInputType>
  | IIntrospectionListTypeRef<TIntrospectionInputTypeRef>
  | IIntrospectionNonNullTypeRef<
      | IIntrospectionNamedTypeRef<TIntrospectionInputType>
      | IIntrospectionListTypeRef<TIntrospectionInputTypeRef>
    >;

export interface IIntrospectionField {
  name: string;
  description?: Maybe<string>;
  args: Array<IIntrospectionInputValue>;
  type: TIntrospectionOutputTypeRef;
  isDeprecated: boolean;
  deprecationReason: Maybe<string>;
}
export interface IIntrospectionInputValue {
  name: string;
  description?: Maybe<string>;
  type: TIntrospectionInputTypeRef;
  defaultValue: Maybe<string>;
  isDeprecated?: boolean;
  deprecationReason?: Maybe<string>;
}

export interface IIntrospectionObjectType {
  kind: 'OBJECT';
  name: string;
  description?: Maybe<string>;
  fields: Array<IIntrospectionField>;
  interfaces: Array<IIntrospectionNamedTypeRef<IIntrospectionInterfaceType>>;
}

export interface IIntrospectionInterfaceType {
  kind: 'INTERFACE';
  name: string;
  description?: Maybe<string>;
  fields: Array<IIntrospectionField>;
  interfaces: Array<IIntrospectionNamedTypeRef<IIntrospectionInterfaceType>>;
  possibleTypes: Array<IIntrospectionNamedTypeRef<IIntrospectionObjectType>>;
}

export interface IIntrospectionUnionType {
  kind: 'UNION';
  name: string;
  description?: Maybe<string>;
  possibleTypes: Array<IIntrospectionNamedTypeRef<IIntrospectionObjectType>>;
}

export interface IIntrospectionEnumType {
  kind: 'ENUM';
  name: string;
  description?: Maybe<string>;
  enumValues: Array<IIntrospectionEnumValue>;
}

export interface IIntrospectionInputObjectType {
  kind: 'INPUT_OBJECT';
  name: string;
  description?: Maybe<string>;
  inputFields: Array<IIntrospectionInputValue>;
}

export type TIntrospectionTypeRef =
  | IIntrospectionNamedTypeRef
  | IIntrospectionListTypeRef
  | IIntrospectionNonNullTypeRef<
      IIntrospectionNamedTypeRef | IIntrospectionListTypeRef
    >;

export interface IIntrospectionListTypeRef<
  T extends TIntrospectionTypeRef = TIntrospectionTypeRef,
> {
  kind: 'LIST';
  ofType: T;
}

export interface IIntrospectionNonNullTypeRef<
  T extends TIntrospectionTypeRef = TIntrospectionTypeRef,
> {
  kind: 'NON_NULL';
  ofType: T;
}

export type TIntrospectionType =
  | IIntrospectionScalarType
  | IIntrospectionObjectType
  | IIntrospectionInterfaceType
  | IIntrospectionUnionType
  | IIntrospectionEnumType
  | IIntrospectionInputObjectType;

export interface IIntrospectionNamedTypeRef<
  T extends TIntrospectionType = TIntrospectionType,
> {
  kind: T['kind'];
  name: string;
}

export interface IIntrospectionDirective {
  name: string;
  description?: Maybe<string>;
  isRepeatable?: boolean;
  locations: Array<DirectiveLocation>;
  args: Array<IIntrospectionInputValue>;
}

export interface IIntrospectionSchema {
  description?: Maybe<string>;
  queryType: IIntrospectionNamedTypeRef<IIntrospectionObjectType>;
  mutationType: Maybe<IIntrospectionNamedTypeRef<IIntrospectionObjectType>>;
  subscriptionType: Maybe<IIntrospectionNamedTypeRef<IIntrospectionObjectType>>;
  types: Array<TIntrospectionType>;
  directives: Array<IIntrospectionDirective>;
}

export interface IIntrospectionResponse {
  __schema: IIntrospectionSchema;
}
