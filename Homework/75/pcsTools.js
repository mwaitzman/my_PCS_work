window.app = window.app || {};
window.app.pcsTools = (function () {
  'use strict';

  function get(selector) {
    return document.querySelector(selector);
  }

  function setCss(elem, property, value) {
    //console.log('in set with', property, value);
    elem.style[property] = value;
  }

  function getCss(elem, property) {
    //console.log('in get with', property);
    return elem.style[property];
  }

  function addEventListener(elem, type, callback) {
    elem.addEventListener(type, callback);
  }

  return {
    wrap: function (selector) {
    	const elem = get(selector);
		let assoc_data = [];

      return {
        /*setCss: (property, value) => setCss(elem, property, value),
        getCss: (property) => getCss(elem, property)*/
        css: function (property, value) {
          if (arguments.length === 2) {
            setCss(elem, property, value);
            return this;
          } else {
            return getCss(elem, property);
          }
        },
        click: function(callback)  {
          addEventListener(elem, 'click', callback);
          return this;
        },
        hide: function() {
          setCss(elem, 'display', 'none');
          return this;
        },
        show: function(displayValue = 'block') {
          setCss(elem, 'display', displayValue);
          return this;
        },

		flash: function(duration, rate=16.667) {
			let time_passed = 0;
			const interval = setInterval(
				() => {
					elem.style.color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);

					time_passed += rate;
					if (time_passed >= duration) {
						clearInterval(interval);
					}
				},
				rate
			);
		},
		
		data: function(key, value) {
			if (value === undefined) {
				const key_str = key.toString();
				//CREDIT: https://stackoverflow.com/a/8831937
					let hash = 0;
						for (let i = 0, len = key_str.length; i < len; i++) {
							let chr = key_str.charCodeAt(i);
							hash = (hash << 5) - hash + chr;
							hash |= 0; // Convert to 32bit integer
						}
				const entry = assoc_data.find(entry => entry.key === hash);
				return entry !== undefined ? entry.value : undefined;
			}
			else {
				const key_str = key.toString();
				//CREDIT: https://stackoverflow.com/a/8831937
					let hash = 0;
						for (let i = 0, len = key_str.length; i < len; i++) {
							let chr = key_str.charCodeAt(i);
							hash = (hash << 5) - hash + chr;
							hash |= 0; // Convert to 32bit integer
						}
				const idx = assoc_data.findIndex(entry => entry.key === hash);
				if (idx === -1) {
					assoc_data.push(
						{
							key: hash,
							value: value
						}
					);
				}
				else {
					const old_value = assoc_data[idx].value;
					assoc_data[idx].value = value;
					return old_value;
				}
			}
		}
      };
    }
  };
})();