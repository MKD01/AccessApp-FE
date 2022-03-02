export const CoordinatesRefactoring = (coordinates) => {
  if (typeof coordinates[0] === "number") {
    return coordinates;
  } else if (typeof coordinates[0][0] === "number") {
    return coordinates[0];
  } else if (typeof coordinates[0][0][0] === "number") {
    return coordinates[0][0];
  } else if (typeof coordinates[0][0][0][0] === "number") {
    return coordinates[0][0][0];
  }
};
