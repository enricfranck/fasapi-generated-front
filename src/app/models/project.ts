export enum AttributeType {
  STRING = 'String',
  INTEGER = 'Integer',
  FLOAT = 'Float',
  BOOLEAN = 'Boolean',
  TEXT = 'Text',
  DATE = 'Date',
  TIME = 'Time',
  DATE_TIME = 'DateTime',
  JSON = 'Json',
}

export class Attributes {
  name?: string;
  type?: AttributeType;
  length?: number | null;
  is_required?: boolean;
  is_unique?: boolean;
  is_indexed?: boolean;
  is_auto_increment?: boolean;
  is_primary?: boolean;
  is_foreign?: boolean;
  foreign_key?: string;
  foreign_key_class?: string;
  default?: boolean = false;
}

export class ClassModel {
  default?: boolean = false;
  name: string = '';
  attributes: Attributes[] = [];
  relations?: string[] = [];
}

export class Project {
  id!: number;
  name: string = '';
  path: string = '';
  config?: any;
  class_model: ClassModel[] = [];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
