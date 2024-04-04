export const createInputContainer = (labelText, inputType, inputName, inputPlaceholder, required) => {
    const label = document.createElement('label');
    label.for = inputName;
    label.innerText = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.name = inputName;
    input.placeholder = inputPlaceholder;
    if(required) {
        input.required = true;
    }

    const message = document.createElement('span');
    message.classList.add('input__message');

    const container = document.createElement('div');
    container.classList.add('input__container');

    container.append(label, input, message);

    return container;
}