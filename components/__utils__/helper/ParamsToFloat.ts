export const ParamsToFloat = (stringArray: string[] | string): number => {
    let temp = '';
    for (let i = 0; i < stringArray.length; i++) {
        temp += stringArray[i];
    }
    return parseFloat(temp);
}