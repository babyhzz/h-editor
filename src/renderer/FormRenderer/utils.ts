export function getShowStatus(
  values: any,
  showCondition: ShowCondition,
  parentField?: string[],
): boolean {
  const [targetField, operator, targetValue] = showCondition;
  console.log(values);
  console.log(showCondition);
  console.log(parentField);
  let fieldValue = null;
  if (targetField.startsWith('.')) {
    if (parentField) {
      fieldValue = values[parentField[0]];
      for (let i = 1; i < parentField.length; i++) {
        fieldValue = fieldValue[parentField[i]];
      }
    } else {
      fieldValue = values;
    }
    fieldValue = fieldValue[targetField.split('.')[1]];
  } else {
    // 其余情况只有一级
    fieldValue = values[targetField];
  }

  switch (operator) {
    case '$eq':
      return fieldValue === targetValue;

    default:
      return true;
  }
}
