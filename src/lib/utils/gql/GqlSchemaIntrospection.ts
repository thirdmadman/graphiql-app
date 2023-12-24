import {
  IntrospectionInputTypeRef,
  IntrospectionInputValue,
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
} from './introspectionImportedTypes';

export class GqlSchemaIntrospection {
  schema: IntrospectionSchema;
  queryName: string | undefined = undefined;
  mutationName: string | undefined = undefined;
  types: Array<IntrospectionType>;

  constructor(schema: IntrospectionSchema) {
    this.schema = schema;
    this.queryName = schema.queryType?.name;
    this.mutationName = schema?.mutationType?.name;
    this.types = schema.types;
  }

  getAllQueries() {
    const queryRoot = this.types.find(
      (el) => el.kind === 'OBJECT' && el.name === this.queryName
    ) as IntrospectionObjectType | undefined;

    return queryRoot?.fields;
  }

  getType(kind: string, name: string) {
    const fieldType = this.types.find(
      (el) => el.kind === kind && el.name === name
    );

    return fieldType;
  }

  getInputObjectType(type: IntrospectionInputTypeRef) {
    if (this.types && type) {
      const fieldType = this.types.find(
        (el) => el.kind === type.kind && el.name === type.name
      );

      return fieldType as IntrospectionInputValue | undefined;
    }
  }
}
