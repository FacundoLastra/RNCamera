export const getLastValidId = (array) => {
    let validId = 0;
    if(Array.isArray(array)){
      array.forEach((element) => {
        validId = element.id + 1;
      })
    }
    return validId;
  }
