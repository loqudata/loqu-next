import { FieldDef } from "vega-lite/build/src/channeldef";
import { TopLevelSpec } from "vega-lite/build/src/spec";

import { Type as VLType } from "vega-lite/build/src/type";

export const fields = {
  Name: {
    type: "string",
  },
  Miles_per_Gallon: {
    type: "integer",
  },
  Cylinders: {
    type: "integer",
  },
  Displacement: {
    type: "integer",
  },
  Horsepower: {
    type: "integer",
  },
  Weight_in_lbs: {
    type: "integer",
  },
  Acceleration: {
    type: "number",
  },
  Year: {
    type: "string",
    format: "date",
  },
  Origin: {
    type: "string",
  },
};

export const fieldOptions = Object.keys(fields)
  //   .map((v) => v.toLowerCase())
  .map((m) => ({
    label: m,
    value: m,
  }));

function typeToVega(t: string) {
  const mapping: Record<string, VLType> = {
    string: "nominal",
    integer: "quantitative",
    number: "quantitative",
  };
  const m = mapping[t];
  if (!m) {
    console.log(t);
  }
  return m;
}

function createField(field: FieldDef<string>) {
  if (!field) return;
  const f = fields[field.field];
  if (!f) {
    console.log(field);
    return field;
  }
  return Object.assign({}, field, {
    type: typeToVega(f.type),
  });
}

export function createSpec(f): TopLevelSpec {
  const s = {
    $schema:
      "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
      url: "https://vega.github.io/editor/data/cars.json",
    },
    mark: {
      type: f.markType,
      tooltip: f.tooltip
        ? f.tooltipAllFields
          ? { content: "data" }
          : true
        : false,
    },
    encoding: {
      x: createField(f.x),
      y: createField(f.y),
      color: createField(f.color),
      size: createField(f.size),
      shape: createField(f.shape),
    },
  };
//   console.log(s);
  return s;
}
