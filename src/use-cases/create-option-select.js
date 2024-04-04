export const newOption = (optionValue, optionText) => {
    const option = document.createElement('option');
    option.value = optionValue;
    if (optionValue === 0) {
        option.innerText = 'Selecciona una pregunta';
    } else if (optionValue > 0) {
        option.innerText = optionText;
    }
    return option;
}