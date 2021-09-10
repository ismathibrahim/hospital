import { Doctor } from "../types";

export const getUniqueFilters = (doctors, filterCategories) => {
  const filters = {};

  filterCategories.forEach((filterCategory) => {
    const newArray = [];

    doctors.forEach((doctor) => {
      if (!newArray.includes(doctor[filterCategory])) {
        newArray.push(doctor[filterCategory]);
      }
    });
    filters[filterCategory] = newArray;
  });

  return filters;
};
