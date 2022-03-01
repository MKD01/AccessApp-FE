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

//  const points = data.map((place) => {
//     return {
//       type: "Feature",
//       properties: {
//         cluster: false,
//         placeId: place.id,
//         placeName: place.properties.name,
//       },
//       geometry: {
//         type: "Point",
//         coordinates: CoordinatesRefactoring(place.geometry.coordinates),
//       },
//     };
//   });
