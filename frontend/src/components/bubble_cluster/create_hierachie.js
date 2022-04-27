export const createHierachie = (rows, fields, fieldsName) => {
  // Root
  let rootMap = {
    name: "publications",
    children: [],
  };

  for (let row of rows) {
    insertRow(rootMap, row, fields, fieldsName);
  }

  console.log(rootMap);
  return rootMap;
};

const insertRow = (map, row, fields, fieldsName) => {
  let children = map.children;
  let parent = map;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const fieldName = fieldsName[i];
    const selectedId = row[field];
    const selectedName = row[fieldName];

    let activeChild;
    for (let child of children) {
      if (child.id === selectedId) {
        activeChild = child;
        break;
      }
    }
    if (activeChild === undefined) {
      const newChild = {
        id: selectedId,
        name: selectedName,
        value: 1,
        children: [],
        parent: parent,
      };

      children.push(newChild);
      children = newChild.children;
      parent = newChild;

      continue;
    }

    children = activeChild.children;
    parent = activeChild;
  }
};
