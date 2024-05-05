interface ValidationResults {
  [key: string]: boolean;
}

export const validateInputObj = (data: any): ValidationResults => {
  const results: ValidationResults = {};

 
  for (const key in data) {
    // console.log(`${key} is ` + data[key]);
    const value = data[key];

    switch (key) {
      case "name":
        results[key] = value.trim().length > 3;
        break;
      case "email":
        results[key] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "phone":
        results[key] = /^\d{9}$/.test(value);
        break;
      default:
        if (results[key]) {
          results[key] = value.trim().length > 3;
        }

        break;
    }
  }

  return results;
};
