window.app = window.app || {};
window.app.messageBox = (function () {
  'use strict';

  const width = 274;
  const height = 162;
  let leftOffset = -137;
  let topOffset = -81;
  let nextZIndex = 1;

  const modalDiv = document.createElement('div');
  modalDiv.style.position = 'absolute';
  modalDiv.style.left = '0';
  modalDiv.style.top = '0';
  modalDiv.style.width = '100%';
  modalDiv.style.height = '100%';
  modalDiv.style.backgroundColor = 'lightblue';
  modalDiv.style.opacity = '.5';
  modalDiv.style.display = 'none';
  document.body.appendChild(modalDiv);

  function showMessageBox(msg, modal, callback, buttons = ['ok']) {
    // buttons = buttons || ['ok'];
    const messageBoxDiv = document.createElement('div');

    messageBoxDiv.className = 'messageBox';

    messageBoxDiv.style.backgroundColor = 'lightblue';
    messageBoxDiv.style.boxSizing = 'border-box';
    messageBoxDiv.style.padding = '1em';
    messageBoxDiv.style.height = `${height}px`;
    messageBoxDiv.style.width = `${width}px`;
    messageBoxDiv.style.position = 'absolute';
    messageBoxDiv.style.top = '50%';
    messageBoxDiv.style.left = '50%';
    messageBoxDiv.style.marginLeft = `${leftOffset}px`;
    messageBoxDiv.style.marginTop = `${topOffset}px`;
    messageBoxDiv.style.textAlign = 'center';
    messageBoxDiv.style.border = '1px solid black';

    //messageBoxDiv.innerHTML = `<span>${msg}</span>`;
    const span = document.createElement('span');
    span.style.overflow = 'auto';
    span.style.height = '80%';
    span.style.display = 'inline-block';
    span.innerText = msg;
    messageBoxDiv.appendChild(span);

    const buttonsDiv = document.createElement('div');
    //buttonsDiv.style.textAlign = 'center';
    buttonsDiv.style.position = 'absolute';
    buttonsDiv.style.width = '100%';
    buttonsDiv.style.left = 0;
    buttonsDiv.style.bottom = '1em';

    for(let i = 0; i < buttons.length; i++) {
      const button = document.createElement('button');
      button.innerText = buttons[i];

      button.addEventListener('click', () => {
        messageBoxDiv.remove();
        modalDiv.style.display = 'none';
        if (callback) {
          callback(buttons[i]);
        }
      });

      buttonsDiv.appendChild(button);
    }
    messageBoxDiv.appendChild(buttonsDiv);

    document.body.appendChild(messageBoxDiv);

    topOffset += 20;
    leftOffset += 20;

    if (parseFloat(getComputedStyle(messageBoxDiv).top) + topOffset + height > window.innerHeight) {
      topOffset -= (window.innerHeight - height);
    }

    if (parseFloat(getComputedStyle(messageBoxDiv).left) + leftOffset + width > window.innerWidth) {
      leftOffset -= (window.innerWidth - width);
    }

    messageBoxDiv.addEventListener('click', () => {
      messageBoxDiv.style.zIndex = nextZIndex++;
    });

    if (modal) {
      modalDiv.style.display = 'block';
      modalDiv.style.zIndex = nextZIndex++;
      messageBoxDiv.style.zIndex = nextZIndex++;
    }
  }

  return {
    show: showMessageBox
  };
}());
