window.app = window.app || {};
window.app.messageBox = (function () {
	'use strict';

	// JS sucks: no real constants
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

	function showMessageBox(msg) {
		let __mut__button_texts;
		let __mut__callback;
		let __mut__modal;
		// JS sucks: no ZCAs
		for (let i = 1; i < arguments.length; i++) {
			if (Array.isArray(arguments[i])) {
				__mut__button_texts = arguments[i];
			}
			else if (arguments[i] instanceof Function) {
				__mut__callback = arguments[i];
			}
			else __mut__modal = arguments[i];
		}
		// JS sucks. No shadowing, no real immutable variables
		const button_texts = __mut__button_texts;
		const callback = __mut__callback;
		const modal = __mut__modal;


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

		const buttons = document.createElement('div');
			//buttons.style.textAlign = 'center';
			buttons.style.position = 'absolute';
			buttons.style.width = '100%';
			buttons.style.left = 0;
			buttons.style.bottom = '1em';

		if (button_texts) {
			for (let i = 0; i < button_texts.length; i++) {
				const button = document.createElement('button');
					//JS sucks: bad conventions and design caused an erroneous assignment to the non-existent `button.innertext` instead of `button.innerText` to silently assign to the unwanted newly created variable
					button.innerText = button_texts[i];
					button.addEventListener('click', function() {
						if (callback) callback(this);
			
						messageBoxDiv.remove();

						if (modal) {
							modalDiv.style.display = "none";
						}
					});
				buttons.appendChild(button);
			}
		}
		else {
			const okButton = document.createElement('button');
			okButton.innerText = 'ok';
	
			okButton.addEventListener('click', function() {
				if (callback) callback(this);
	
				messageBoxDiv.remove();
				//if(modal) {
					modalDiv.style.display = 'none';
				//}
			});
	
			buttons.appendChild(okButton);
		}


		messageBoxDiv.appendChild(buttons);

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
