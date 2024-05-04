interface ValidationResults {
  [key: string]: boolean;
}

export const validateInputObj = (data: any): ValidationResults => {
  const results: ValidationResults = {};

  // Validate each property in the data object
  for (const key in data) {
    const value = data[key];

    switch (key) {
      case "text":
        // Example name validation (can be customized)
        results[key] = value.trim().length > 0;
        break;
      case "email":
        // Example email validation (can be customized)
        results[key] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "phone":
        // Example telephone validation (can be customized)
        results[key] = /^\d{10}$/.test(value); // Assuming 10-digit phone number
        break;
      // Add more cases for other properties as needed
      default:
        // No specific validation for other properties
        results[key] = value.trim().length > 0;
        break;
    }
  }

  return results;
};
