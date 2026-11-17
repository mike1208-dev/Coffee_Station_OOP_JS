export const requireText = (value, label) => {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${label} must not be empty.`);
    }
};

export const requireNumber = (value, label) => {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new Error(`${label} must be a number.`);
    }
};

export const requireWholeNumber = (value, label) => {
    requireNumber(value, label);
    if (!Number.isInteger(value)) {
        throw new Error(`${label} must be a whole number.`);
    }
};
