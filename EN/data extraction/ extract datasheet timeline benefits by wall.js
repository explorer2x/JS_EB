const processeditem = [];
var get_client_url = 'https://' + document.domain + '/benefits/Brokers/Wall/GetIncompleteClientItems';
var broker_wall_url = 'https://' + document.domain + '/benefits/Brokers/Wall/BrokerWall';
var incomp_url = 'https://' + document.domain + '/benefits/Brokers/Wall/GetIncompleteClientItems';


var scriptTags = document.getElementsByTagName('script');
var token = null;
var tokenRegex = /var token = '([A-F0-9]+)';/;
for (var i = 0; i < scriptTags.length; i++) {
	var scriptContent = scriptTags[i].textContent || scriptTags[i].innerHTML;
	var match = tokenRegex.exec(scriptContent);
	if (match) {
		token = match[1];
		break;
	}
}


function delay(n) {
	return new Promise(function(resolve) {
		setTimeout(resolve, n * delay_second * 1000);
	});
}

async function get_client_id_list(fetch_url, feed_id) {
	await delay(5);
	const data = feed_id;
	try {
		const response = await fetch(fetch_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Entoken': token
			},
			body: data
		});
		const responseData = await response.json();
		return (responseData);
	} catch (error) {
		console.error('Error:', error);
	}
}

async function main_job() {
	var ee_ids = [];
	var incomplet = await get_client_id_list(incomp_url, 0);
	for (o = 0; o < incomplet.length; o++) {
		var client_id = incomplet[o].ClientId;
		var client_detail = await get_client_id_list(broker_wall_url, client_id);
		var broker_wall_events = client_detail.WallModel.Events;
		var res = [];
		for (p = 0; p < broker_wall_events.length; p++) { //10; p++) {

			if (!ee_ids.includes(broker_wall_events[p].EmpId)) {
				ee_ids.push(broker_wall_events[p].EmpId);
				var ee_info = await get_ee_job(broker_wall_events[p].EmpId)
			} else {
				var ee_info = []
			}
			const result = {
				ClientName: broker_wall_events[p].ClientName,
				CreatedDate: broker_wall_events[p].CreatedDate,
				Reason: broker_wall_events[p].Reason,
				EmpId: broker_wall_events[p].EmpId,
				Feed: broker_wall_events[p].Feed,
				EmployeeName: broker_wall_events[p].EmployeeName,
				EmployeeInfo: ee_info
			};
			//processeditem.push(JSON.stringify(result));
			processeditem.push(result);
		}

		await delay(2);
	}

	//const textContent = '[' + processeditem.join(',') + ']';
	//let newClipboardString = JSON.stringify(JSON.parse(textContent));

	//	navigator.clipboard.writeText(newClipboardString);
}

async function get_call(url) {
	await delay(1);
	console.log('now fetching ' + url);

	try {
		const response = await fetch(url, {
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				'Referer': 'https://' + document.domain + '/benefits/Brokers/Wall/',
				'Sec-Fetch-Dest': 'document',
				'Sec-Fetch-Mode': 'navigate'
			}
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		console.log('fetch finished');
		return await response.text();
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
}

function parse_timeline(html) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');
	var scriptTags = doc.querySelectorAll('script[type="text/javascript"]');
	var eventsData;
	for (var i = 0; i < scriptTags.length; i++) {
		var scriptContent = scriptTags[i].textContent;
		var eventsRegex = /events:\s*([\s\S]*?\}\]),/;
		var matches = eventsRegex.exec(scriptContent);

		if (matches && matches[1]) {
			eventsData = JSON.parse(matches[1]);
			break;
		}
	}
	return eventsData
}

function parse_datasheet(html) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');
	var scripts = Array.from(doc.querySelectorAll('script'));
	var scriptTag = scripts.find(script => script.textContent.includes('var model = {'));
	var eventsData;
	var scriptContent = scriptTag.textContent;
	var eventsRegex = /model = \s*([\s\S]*?\;)/;
	var matches = eventsRegex.exec(scriptContent);

	if (matches && matches[1]) {

		if (matches[1].endsWith(";")) {
			modifiedString = matches[1].slice(0, -1);
		} else {
			modifiedString = matches[1];
		}
		eventsData = JSON.parse(modifiedString);
	}
	return eventsData
}

function parse_benefitplan(html) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(html, 'text/html');
	let enrolledPlansTable = doc.querySelector('.table.table-striped.table-condensed');

	let enrolledPlans = [];
	if (enrolledPlansTable) {
		let rows = enrolledPlansTable.querySelectorAll('tbody tr');
		rows.forEach((row, index) => {
			if (index === 0) return;
			let columns = row.querySelectorAll('td');
			enrolledPlans.push({
				planType: columns[0].innerText.trim(),
				carrier: columns[1].innerText.trim(),
				planName: columns[2].innerText.trim(),
				coverage: columns[3].innerText.trim(),
				effectiveDate: columns[4].innerText.trim(),
				costPerPay: columns[5].innerText.trim(),
				benefit: columns[6].innerText.trim()
			});
		});
	}
	let enrolledPlansJSON = JSON.stringify(enrolledPlans, null, 2);
	return enrolledPlansJSON;
}

async function get_benefitplan(ee_id) {
	const html_var = await get_call('https://' + document.domain + '/benefits/Hris/Employee/BenefitsSummary?empId=' + ee_id);
	var eventsData_raw = parse_benefitplan(html_var);
	var eventsData = JSON.parse(eventsData_raw);
	return await eventsData;
}

async function get_datasheet(ee_id) {
	const html_var = await get_call('https://' + document.domain + '/benefits/Hris/Employee/DataSheet?empId=' + ee_id);
	const eventsData = parse_datasheet(html_var);
	return await eventsData;
}

async function change_group(g_id) {
	var group_url = 'https://' + document.domain + '/benefits/Brokers/Session/ChangeClient';

	await delay(2);
	const data = g_id;
	try {
		const response = await fetch(group_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Entoken': token,
				'Referer': 'https://' + document.domain + '/benefits/Brokers/',
			},
			body: data
		});
		const responseData = await response.json();
		return true;
	} catch (error) {
		return false;
		console.error('Error:', error);
	}
}

async function get_timeline(ee_id) {
	const html_var = await get_call('https://' + document.domain + '/benefits/Hris/Employee/Timeline?empId=' + ee_id);
	const eventsData = parse_timeline(html_var);
	return await eventsData;
}

function printTableData(table, tableName) {
	console.log(`\n${tableName}:`);
	table.forEach((item, index) => {
		console.log(`Element ${index}:`);
		Object.keys(item).forEach(key => {
			console.log(`  ${key}: ${item[key]}`);
		});
		console.log('---');
	});
}

async function get_ee_job(ee_id) {
	const ee_res = [];
	var benefitplan = await get_benefitplan(ee_id);
	var datasheet = await get_datasheet(ee_id);
	var timeline = await get_timeline(ee_id);

	const result = {
		BenefitPlan: benefitplan,
		DataSheet: datasheet,
		TimeLine: timeline,
	};
	//ee_res.push(JSON.stringify(result));
	ee_res.push(result);
	if (test_mode == true) {
		if (benefitplan) {
			printTableData(benefitplan, 'Benefit Plan');
		} else {
			console.error("Benefit plan data not found");
		}

		if (timeline) {
			printTableData(timeline, 'Timeline');
		} else {
			console.error("Timeline data not found");
		}

		if (datasheet) {
			if (datasheet.EmployeeData && datasheet.EmployeeData.Table) {
				printTableData(datasheet.EmployeeData.Table, 'Employee Data');
			}

			if (datasheet.Dependents && datasheet.Dependents.Table) {
				printTableData(datasheet.Dependents.Table, 'Dependents');
			}

			if (datasheet.EmployeeAddresses && datasheet.EmployeeAddresses.Table) {
				printTableData(datasheet.EmployeeAddresses.Table, 'Employee Addresses');
			}
		} else {
			console.error("Datasheet data not found");
		}
	} else {
		//console.log(ee_res);
		return ee_res
	}

}



async function job() {
	await main_job();
	console.log(processeditem);
	alert('done');
};
var test_mode = false;
var delay_second = 0.5;
job()
