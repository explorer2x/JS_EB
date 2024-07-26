javascript:

function evaluateKey(key) {
		if (key.endsWith("()")) {
			const functionName = key.slice(0, -2);
			if (typeof window[functionName] === "function") {
				return window[functionName]();
			}
		}
		return key;
	}

function SelectOptionByText(selectElement, text, Layer) {



	if (Layer) {
		var current_doc = eval(Layer);
	}else{
	    var current_doc = document;
	    
	}

	selectElement = current_doc.querySelector(selectElement);

	if (!selectElement) {
		console.error("Select element not found");
		return;
	}
	let options = selectElement.options;
	for (let i = 0; i < options.length; i++) {
		if (options[i].text === text) {
			selectElement.selectedIndex = i;
			break;
		}
	}
}

function InputValue(inputElement_selector, val, Layer) {


	if (Layer) {
		var current_doc = eval(Layer);
	}else{
	    var current_doc = document;
	    
	}

	inputElement = current_doc.querySelector(inputElement_selector);
	if (!inputElement) {
		console.error("InputValue element not found");
		return;
	}

	inputElement.dispatchEvent(new Event('focusin'));
	inputElement.value = val;
	inputElement.dispatchEvent(new Event('input'));
	inputElement.dispatchEvent(new Event('change'));
	inputElement.dispatchEvent(new Event('blur'));
	inputElement.dispatchEvent(new Event('keyup'));

}

function SelectRadioButton(RadioElement_selector, val, Layer) {

	if (Layer) {
		var current_doc = eval(Layer);
	}else{
	    var current_doc = document;
	}

	RadioElement = current_doc.querySelector(RadioElement_selector);

	if (!RadioElement) {
		console.error("InputValue element not found");
		return;
	}
	if (val == true) {
		RadioElement.click()
	};
}

function SelectCheckBox(CheckBoxElement_selector, val) {}

function ClickButton(ButtonElement_selector) {}

function extractNameFromCancellationNotice() {
	var targetTd = document.getElementsByName('Web Page')[0].contentWindow.document.querySelector('.borderlessTable');
	if (targetTd) {
		var regex = /To cancel (.*?)(?:,| and family)/;
		var text = targetTd.textContent;
		var match = regex.exec(text);

		if (match && match[1]) {
			console.log('Extracted Name:', match[1].trim());
			return match[1].trim();
		} else {
			console.log('No name matching the pattern was found.');
			return null;
		}
	} else {
		console.log('No target <td> with colspan="2" was found.');
		return null;
	}
}

function extractEENameFromAddDependentPage() {
	var fullString = document.getElementsByName('Web Page')[0].contentWindow.document.querySelector("#portlet > div:nth-child(1) > h2").textContent.trim();
	if (fullString.includes('ID#')) {
		var name = fullString.split(' ID#')[0];
		return name;
	} else {
		return null;
	}
}

function if_dept() {
	var firstTable = document.querySelector('#launchpad > div.centerdetails1.modify > div > div > div.roundedtl > div.float_left > table');
	if (firstTable) {
		var rows = firstTable.getElementsByTagName('tr');
		var hasDependentID = false;

		for (var i = 0; i < rows.length; i++) {
			var key = rows[i].cells[0].innerText.trim();
			if (key.includes("Dependent ID")) {
				hasDependentID = true;
				break;
			}
		}
		return hasDependentID;
		console.log('Does the first table contain "Dependent ID"?', hasDependentID);
	} else {
		return hasDependentID;
		console.log('No table with class "details" was found.');
	}
}

function get_current_page(jsonobj) {
	var current_page = null;
	var current_page_Fields = null;
	for (let i = 0; i < jsonobj.length; i++) {
		const page = jsonobj[i];

		let breakOuterLoop = true;

		for (let j = 0; j < page.PageIndicator.length; j++) {

			let indicator_Match = false;

			const indicator = page.PageIndicator[j];
			let indicatorSelector = indicator.Selector;
			let indicatorValue = indicator.Value;
			let indicatorLayer = indicator.Layer;


			if (indicatorLayer) {
				var current_doc = eval(indicatorLayer);
			} else {
				var current_doc = document;

			}

			console.log("page.PageIndicator[j]", "|", evaluateKey(indicatorSelector), "|", indicatorValue, "|", indicator.Type);

			if (typeof(indicatorSelector) == 'boolean') {
				console.log("here is boolean line", "|", indicatorSelector, "|", indicatorValue, "|", indicator.Type);
				if (indicatorSelector == indicatorValue) {
					indicator_Match = true;
				}
			} else if (indicatorSelector.startsWith("#") || indicatorSelector.startsWith("[")) {

				console.log('indicatorSelector.startsWith("# or [")');

				if (current_doc.querySelector(indicatorSelector) == null) {
					console.log('if selector is null:', current_doc.querySelector(indicatorSelector) == null);
					indicator_Match = false;
				} else {
					if (indicator.Type === 'trimValue') {

						indicator_ElementOnPage = current_doc.querySelector(indicatorSelector);

						indicator_valueOnPage = indicator_ElementOnPage.textContent.trim();
						console.log("trimValue here is indicator_valueOnPage:", indicator_valueOnPage, "   ", "indicatorValue: ", indicatorValue, "      ", indicator_valueOnPage == indicatorValue);
						if (indicator_valueOnPage == indicatorValue) {
							indicator_Match = true;
							console.log(indicator_Match);
						}
					} else if (indicator.Type === 'Exists') {

						console.log("Exists here is indicatorSelector:", indicatorSelector, "   ", current_doc.querySelector(indicatorSelector));
						if (current_doc.querySelector(indicatorSelector) != null) {
							indicator_Match = true;
							console.log(indicator_Match);
						}
					} else if (indicator.Type === 'Visible') {
						console.log("Visible here is indicatorSelector:", indicatorSelector, "   ", current_doc.querySelector(indicatorSelector).type);
						if (current_doc.querySelector(indicatorSelector).type != 'hidden') {
							indicator_Match = true;
							console.log(indicator_Match);
						}
					} else if (indicator.Type === 'Value') {
						indicator_valueOnPage = current_doc.querySelector(indicatorSelector).value;
						console.log("here is indicator_valueOnPage:", indicator_valueOnPage, indicatorValue);

						if (indicator_valueOnPage == indicatorValue) {
							indicator_Match = true;
						}
					}
				}
			} else if (indicatorSelector.endsWith("()")) {
				if (indicator.Type === 'Value') {

					indicator_valueOnPage = evaluateKey(indicatorSelector);
					console.log("here is indicator_valueOnPage:", indicator_valueOnPage, indicatorValue);

					if (indicator_valueOnPage == indicatorValue) {
						indicator_Match = true;
					}
				}

			}

			if (indicator_Match == false) {
				breakOuterLoop = false;
				console.log("Page indicator failed to found, breaking current page's indicator's loop.", j);
				break;
			} else {
				console.log("indicator_Match： ", indicator_Match);
			}
		}

		if (breakOuterLoop == true) {
			var current_page = page.PageName;
			var current_page_Fields = page.Fields;
			break;
		}

	}
	return [current_page, current_page_Fields];

}

function enter_per_JSON(Fields) {
	Fields.forEach(field => {
		if (field.FieldsType === "Input") {
			InputValue(field.Selector, field.Value, field.Layer);
			console.log(`Input set for ${field.Selector}, value is ${field.Value}`);
		} else if (field.FieldsType === "Select") {
			SelectOptionByText(field.Selector, field.Value, field.Layer);
			console.log(`Selection made for ${field.Selector}, value is ${field.Value}`);
		} else if (field.FieldsType === "RadioButton") {
			SelectRadioButton(field.Selector, field.Value, field.Layer);
			console.log(`RadioButton value made for ${field.Selector}, value is ${field.Value}`);
		} else if (field.FieldsType === "CheckBox") {
			InputValue(field.Selector, field.Value, field.Layer);
			console.log(`CheckBox value made for ${field.Selector}, value is ${field.Value}`);
		} else if (field.FieldsType === "Button") {
			InputValue(field.Selector, field.Value, field.Layer);
			console.log(`CheckBox value made for ${field.Selector}, value is ${field.Value}`);
		}
	});
}

async function get_clipboard() {
	window.focus();
	document.body.focus();
	const clipboardText = await navigator.clipboard.readText();
	return (clipboardText);
}

async function write_clipboard(jsonObject) {
	window.focus();
	document.body.focus();
	let newClipboardString = JSON.stringify(jsonObject);
	await navigator.clipboard.writeText(newClipboardString);
}

async function BCBSILjob() {
	var jsonstr = await get_clipboard();
	console.log(jsonstr);
	var jsonobj = JSON.parse(jsonstr);
	const page_res = get_current_page(jsonobj[0]['JSON']);
	console.log("Current Page: ", page_res[0], " Page Field: ", page_res[1]);

	if (page_res[1] == null) {
		alert("This page not automated")
	} else {
		enter_per_JSON(page_res[1]);
	}
}

async function testjob() {
	var jsonstr = await get_clipboard();
	console.log(jsonstr);
	var jsonobj = JSON.parse(jsonstr);

	jsonobj[0]['Domain'] = "www.bcbsil.com";
	await write_clipboard(jsonobj);

}

function MainJob() {
	BCBSILjob();
}

MainJob()
