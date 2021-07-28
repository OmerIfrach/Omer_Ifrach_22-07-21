export const validateName = (str) => {
  let valid = true;

  if (str.length > 0 && str.trim() === "") {
    valid = false;
  }
 
  return valid;
};

export const validatePositiveNumber = (number)=>{
  let valid = true;

  if (isNaN(number) || number <= 0) {
    valid = false;
  }

  return valid;
}

export const validateDate = (dateStr)=>{
  return (!(new Date(dateStr) === "Invalid Date"));
}