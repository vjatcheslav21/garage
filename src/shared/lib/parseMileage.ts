
export const parseMileage = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) return 0;
    return num;
}