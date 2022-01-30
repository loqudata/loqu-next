import { Table } from "apache-arrow";

// function rowProxy(table) {
//   const fields = table.schema.fields.map((d) => d.name);
//   const proto = {};

//   fields.forEach((name, index) => {
//     const column = table.getColumnAt(index);

//     // skip columns with duplicate names
//     if (proto.hasOwnProperty(name)) return;

//     Object.defineProperty(proto, name, {
//       get: function () {
//         return column.get(this[RowIndex]);
//       },
//       set: function () {
//         throw Error("Arrow field values can not be overwritten.");
//       },
//       enumerable: true,
//     });
//   });

//   return (i) => {
//     const r = Object.create(proto);
//     r[RowIndex] = i;
//     return r;
//   };
// }
export function getFieldNames(table: Table) {
  return table.schema.fields.map((d) => d.name);
}

export function createListOfObjectsArrowProxy(table: Table): any[] {
  const fields = getFieldNames(table)
  let result = [];
  for (let i = 0; i < table.length; i++) {
    let proto = {...fields};

    fields.forEach((name, index) => {
      Object.defineProperty(proto, name, {
        get: function () {
          return table.get(i)[name];
        },
        set: function () {
          throw Error("Arrow field values can not be overwritten.");
        },
        enumerable: true,
      });
    });
    result.push(Object.create(proto))
  }
  return result
}
