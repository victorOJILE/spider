export default function media(type, props, callback) {
	
	let tests = {
		image: /^(89504E47|FFD8FFDB|FFD8FFE0|47494638|424D)/,
		audio: /^494433|57415645/,
		video: /^52494646|000001BA|66747970|1A45DFA3|6D6F6F76|1A45DFA3/
	}
	
	return el('input', {
		...props,
		type: "file",
		event: {
			change(e) {
				const file = e.target.files[0];

				if (file) {
					if(file.type) {
						if(file.type.match(new RegExp(type)) || (type == 'audio' && file.type.match(/application\/oct/))) {
							let result = URL.createObjectURL(file);
							return callback(result, file.name);
						} else {
							console.log(file.type + ' is not a ' + type + ' file');
							return callback();
						}
					}
					
					const reader = new FileReader();

					reader.onload = function() {
						// Check the file signature to determine its type
						const arr = new Uint8Array(reader.result).subarray(0, 4);
						const header = Array.from(arr, byte => byte.toString(16)).join('').toUpperCase();
						
						if (tests[type].test(header)) {
							const blob = new Blob([reader.result]);

							const reader2 = new FileReader();

							reader2.onload = callback;

							reader2.readAsDataURL(blob);
						} else {
							console.log('No match from reader' + type);
							callback();
						}
					}

					reader.readAsArrayBuffer(file);
				}
			}
		}
	});
}