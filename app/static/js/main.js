window.onclick = (evt) => {
	if (!evt.target.matches('*[class^="dropdown-button"]')) {
		let dropdowns = document.getElementsByClassName('dropdown-content');
		for (let i = 0; i < dropdowns.length; i++) {
			dropdowns[i].classList.remove('show');
		}
	}
}

function documentReady(fn) {
	document.addEventListener('DOMContentLoaded', fn);
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		fn();
	}
}

function toggleDropdown(elementId) {
	document.getElementById(elementId).classList.toggle('show');
}

function submitForm(evt) {
	evt.preventDefault();
	let data = [...this.elements].reduce((obj, input, i) => {
		if (input.name && input.value) {
			obj[input.name] = input.value;
		}
		return obj;
	}, {});
	fetch(`${this.getAttribute('action')}`, {
		method: this.getAttribute('method'),
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content,
		},
		body: JSON.stringify(data),
	}).then(resp => resp.json()).then(resp => {
		if (resp.ok) { // success
			showToast(resp.msg, 'fas fa-check-square');
		} else {
			if (resp.err) { // error
				showToast(resp.msg, 'fas fa-times-circle')
			} else { // reject
				showToast(resp.msg, 'fas fa-exclamation-triangle')
			}
		}
	}).catch(err => {
		console.error(err);
	});
}

function showToast(msg, icon) {
	let snackbar = document.getElementById('toast');
	document.getElementById('toast-icon').className = icon;
	document.getElementById('toast-text').innerHTML = msg;
	snackbar.classList.add('flash');
	setTimeout(() => {
		snackbar.classList.remove('flash');
	}, 3000);
}
