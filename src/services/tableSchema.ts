export interface ISchema {
  primaryKey: string[];
  foreignKeys: object[];
  fields: IField[];
}

export class IField {
  name: string;
  title: string;
  description: string;

  
  type: string;

  format: string;
  required: boolean;
  constraints: object;
}
