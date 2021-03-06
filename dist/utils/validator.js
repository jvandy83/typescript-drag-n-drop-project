export function validate(input) {
    let isValid = true;
    const { value, required, minLength, maxLength, min, max } = input;
    if (required && typeof value === 'string') {
        isValid = isValid && value.trim().length !== 0;
    }
    if (minLength && typeof value === 'string') {
        isValid = isValid && value.trim().length >= minLength;
    }
    if (maxLength && typeof value === 'string') {
        isValid = isValid && value.trim().length <= maxLength;
    }
    if (min && typeof value === 'number') {
        isValid = isValid && value >= min;
    }
    if (max && typeof value === 'number') {
        isValid = isValid && value <= max;
    }
    return isValid;
}
//# sourceMappingURL=validator.js.map