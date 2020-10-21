const createActionName = (prefix, name) => {
  return `@Pizza_${prefix}_${name}`.toUpperCase();
};

export default createActionName;
