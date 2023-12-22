import {
  Arg,
  Field,
  IIntrospectionResponse,
  IIntrospectionSchema,
  Type,
  TypeType,
} from './introspection';

export class GqlSchemaIntrospection {
  schema: IIntrospectionSchema;
  queryName: string | undefined = undefined;
  mutationName: string | undefined = undefined;
  types: Array<Type>;

  constructor(schemaResponse: IIntrospectionResponse) {
    this.schema = schemaResponse.__schema;
    this.queryName = schemaResponse.__schema.queryType?.name;
    this.mutationName = schemaResponse.__schema?.mutationType?.name;
    this.types = schemaResponse.__schema.types;

    console.error('this.types :>> ', this.types);
  }

  getArgType(arg: Arg): Arg {
    const fieldWithArgTypes = {
      ...arg,
      type: this.getFieldType(arg.type),
    };

    return fieldWithArgTypes as Arg;
  }

  getFieldType(type: TypeType): Type | undefined {
    if (this.types && type) {
      const fieldType = this.types.filter(
        (el) => el.kind === type.kind && el.name === type.name
      )[0];

      if (!fieldType?.fields || fieldType.fields.length < 1) {
        return fieldType;
      }

      const nestedFieldsType = fieldType.fields
        .map((el) =>
          el
            ? {
                ...el,
                type: this.getFieldType(el.type),
                args: el.args.map((elArg) => this.getArgType(elArg)),
              }
            : undefined
        )
        .filter((el) => el);

      return {
        ...fieldType,
        fields: nestedFieldsType as Array<Field>,
      };
    }
  }

  getAllQueries() {
    const queryRoot = this.types.filter((el) => el.name === this.queryName)[0]
      .fields;

    return queryRoot;
  }

  getAllQueriesWithTypes() {
    const queryRoot = this.getAllQueries();

    const filedTypes = queryRoot
      ?.map((el) =>
        el
          ? {
              ...el,
              type: this.getFieldType(el.type),
              args: el.args.map((elArg) => this.getArgType(elArg)),
            }
          : undefined
      )
      .filter((el) => el);
    return filedTypes;
  }
}
