import {
  TIntrospectionInputTypeRef,
  IIntrospectionInputValue,
  IIntrospectionObjectType,
  IIntrospectionSchema,
  TIntrospectionType,
} from '../../../types/introspectionImportedTypes';

export class GqlSchemaIntrospection {
  schema: IIntrospectionSchema;
  queryName: string | undefined = undefined;
  mutationName: string | undefined = undefined;
  subscriptionName: string | undefined = undefined;
  types: Array<TIntrospectionType>;

  constructor(schema: IIntrospectionSchema) {
    this.schema = schema;
    this.queryName = schema.queryType?.name;
    this.mutationName = schema?.mutationType?.name;
    this.subscriptionName = schema?.subscriptionType?.name;
    this.types = schema.types;
  }

  getAllQueries() {
    const queryRoot = this.types.find(
      (el) => el.kind === 'OBJECT' && el.name === this.queryName
    ) as IIntrospectionObjectType | undefined;

    return queryRoot?.fields;
  }

  getAllMutations() {
    const queryRoot = this.types.find(
      (el) => el.kind === 'OBJECT' && el.name === this.mutationName
    ) as IIntrospectionObjectType | undefined;

    return queryRoot?.fields;
  }

  getAllSubscriptions() {
    const queryRoot = this.types.find(
      (el) => el.kind === 'OBJECT' && el.name === this.subscriptionName
    ) as IIntrospectionObjectType | undefined;

    return queryRoot?.fields;
  }

  getType(kind: string, name: string) {
    const fieldType = this.types.find(
      (el) => el.kind === kind && el.name === name
    );

    return fieldType;
  }

  getInputObjectType(type: TIntrospectionInputTypeRef) {
    if (this.types && type) {
      const fieldType = this.types.find(
        (el) => el.kind === type.kind && el.name === type.name
      );

      return fieldType as IIntrospectionInputValue | undefined;
    }
  }
}
