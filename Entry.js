javascript: navigator.clipboard.readText().then((clipboardString) => {
	const jsonObject = JSON.parse(clipboardString);

	function getFormattedDate(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth()).toString().padStart(2, '0');
		let day = date.getDate().toString().padStart(2, '0');
		return month + '/' + day + '/' + year;
	};
	if (document.domain == "www.guardiananytime.com") {
		function input_refresh(tgt_el_id, val) {
			tgt_elg = document.getElementById(tgt_el_id);
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};
		if (document.getElementById('member.gender') != null) {
			const dic = {
				"SSN": "member.memberID",
				"DATE_OF_HIRE": "",
				"ELIG_DATE": "",
				"TERM_DATE": "",
				"FIRST_NAME": "member.firstName",
				"MIDDLE_NAME": "member.middleName",
				"LAST_NAME": "member.lastName",
				"DOB": "member.dateBirth",
				"ADD1": "homeAddress.address1",
				"ADD2": "homeAddress.address2",
				"ADDZIP": "homeAddress.zipcode",
				"WORKPHONE": "phoneNumber",
				"WORK_EMAIL": "email",
				"HOUR_PER_WEEK": "hoursWorked1",
				"ANNUAL_SALARY": "salary2",
				"JOB_TITLE": "jobTitle",
			};
			for (var keyg in dic) {
				var itemg = dic[keyg];
				if (itemg != '' && document.getElementById(itemg) != null) {
					var tgt_elg = document.getElementById(itemg);
					tgt_elg.dispatchEvent(new Event('focusin'));
					if (itemg == "member.dateBirth") {
						g_doh = new Date(jsonObject.ee_BASIC_info[keyg]);
						tgt_elg.value = getFormattedDate(g_doh);
					} else {
						tgt_elg.value = jsonObject.ee_BASIC_info[keyg];
					};
					tgt_elg.dispatchEvent(new Event('change'));
					tgt_elg.dispatchEvent(new Event('blur'));
					tgt_elg.dispatchEvent(new Event('focusout'));
				}
			};
			var sex_g = jsonObject.ee_BASIC_info['GENDER'];
			if (sex_g == 'F' || sex_g == 'Female') {
				sex_g = 'F'
			} else if (sex_g == 'M' || sex_g == 'Male') {
				sex_g = 'M'
			};
			input_refresh('member.gender', sex_g);
			if (jsonObject.ee_DEPT_info.Spouse.FIRST_NAME != "") {
				document.getElementById('lbl-radioMarried-yes').click()
			} else {
				document.getElementById('lbl-radioMarried-no').click()
			};
			if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				document.getElementById('lblradioChildrens-yes').click()
			} else {
				document.getElementById('lblradioChildrens-no').click()
			};
			if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				document.getElementById('salaryPeriod').click()
			} else {
				document.getElementById('lblradioChildrens-no').click()
			};
			input_refresh('salary2', jsonObject.ee_BASIC_info.ANNUAL_SALARY.replace(/[^\d,.]+/g, ''));
		};
		if (document.getElementById("elections.Dental.selectedPlan") != null) {
			var allWaives = document.getElementsByTagName("span");
			for (i = 0; i < allWaives.length; i++) {
				if (allWaives[i].textContent == 'Waived') {
					allWaives[i].click();
				}
			}
		};
		if (document.getElementById("dependents.spouse.memberID") != null) {
			sp_dic = {
				"SSN": "dependents.spouse.memberID",
				"FIRST_NAME": "dependents.spouse.firstName",
				"MIDDLE_NAME": "dependents.spouse.middleName",
				"LAST_NAME": "dependents.spouse.lastName",
				"WORKPHONE": "dependents.spouse.phone",
				"WORK_EMAIL": "dependents.spouse.email",
				"GENDER": "dependents.spouse.gender",
			};
			if (jsonObject.ee_DEPT_info.Spouse.FIRST_NAME != "") {
				for (key in sp_dic) {
					if (jsonObject.ee_DEPT_info.Spouse[key] != "" && document.getElementById(sp_dic[key]) != null) {
						input_refresh(sp_dic[key], jsonObject.ee_DEPT_info.Spouse[key]);
					}
				};
				if (jsonObject.ee_DEPT_info.Spouse.GENDER == 'F') {
					input_refresh('dependents.spouse.relationship', 'W');
				};
				if (jsonObject.ee_DEPT_info.Spouse.GENDER == 'M') {
					input_refresh('dependents.spouse.relationship', 'H');
				};
				if (jsonObject.ee_DEPT_info.Spouse.DOB != '') {
					g_doh = new Date(jsonObject.ee_DEPT_info.Spouse.DOB);
					input_refresh('dependents.spouse.dateBirth', getFormattedDate(g_doh));
				};
			};
		};
		if (document.getElementById("dependents.children[0].firstName") != null && jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
			console.log('s');
			var dept_ct = 0;

			function add_dept(ct) {
				for (o = 1; o < ct; o++) {
					var allPageTags = document.getElementsByTagName("button");
					for (i = 0; i < allPageTags.length; i++)
						if (allPageTags[i].textContent == 'Add') {
							allPageTags[i].click();
							break;
						}
				}
			};
			if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				dept_ct = dept_ct + jsonObject.ee_DEPT_info.Child.FIRST_NAME.split('|').length
			};
			if (dept_ct > 1) {
				add_dept(dept_ct)
			};
			dep_dic = {
				"SSN": "dependents.children[0].memberID",
				"FIRST_NAME": "dependents.children[0].firstName",
				"MIDDLE_NAME": "dependents.children[0].middleName",
				"LAST_NAME": "dependents.children[0].lastName",
				"DOB": "dependents.children[0].dateBirth",
				"WORKPHONE": "dependents.children[0].phone",
				"WORK_EMAIL": "dependents.children[0].email",
				"GENDER": "dependents.children[0].gender",
			};
			var c_i = 0;
			for (c_i = 0; c_i < dept_ct; c_i++) {
				for (key in dep_dic) {
					if (jsonObject.ee_DEPT_info.Child[key] != "" && document.getElementById(dep_dic[key].replace('0', c_i)) != null) {
						input_refresh(dep_dic[key].replace('0', c_i), jsonObject.ee_DEPT_info.Child[key].split('|')[c_i]);
					}
				};
				if (jsonObject.ee_DEPT_info.Child.GENDER.split('|')[c_i] == 'F') {
					input_refresh('dependents.children[' + c_i + '].relationship', 'D');
				};
				if (jsonObject.ee_DEPT_info.Child.GENDER.split('|')[c_i] == 'M') {
					input_refresh('dependents.children[' + c_i + '].relationship', 'S');
				};
				if (jsonObject.ee_DEPT_info.Child.DOB.split('|')[c_i] != '') {
					g_doh = new Date(jsonObject.ee_DEPT_info.Child.DOB.split('|')[c_i]);
					input_refresh('dependents.children[' + c_i + '].dateBirth', getFormattedDate(g_doh));
				};
			}
		};
		if (document.getElementById("memberInfoDO.eventDate") != null) {
			const dic = {
				"SSN": "ssn",
				"DOH": "",
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleInitial",
				"LAST_NAME": "lastName",
				"DOB": "dateOfBirth",
				"ADD1": "addressLine1",
				"ADD2": "addressLine2",
				"ADDCITY": "city",
				"ADDZIP": "zipCode",
				"WORK_EMAIL": "email",
				"HOUR_PER_WEEK": "hoursWorked",
				"ANNUAL_SALARY": "salarydollar",
				"JOB_TITLE": "jobTitle",
			};
			for (var keyg in dic) {
				var itemg = dic[keyg];
				if (itemg != '' && jsonObject.ee_BASIC_info[keyg] != '' && document.getElementById(itemg) != null) {
					var tgt_elg = document.getElementById(itemg);
					tgt_elg.dispatchEvent(new Event('focusin'));
					if (itemg == "dateOfBirth") {
						g_doh = new Date(jsonObject.ee_BASIC_info[keyg]);
						tgt_elg.value = getFormattedDate(g_doh);
					} else {
						tgt_elg.value = jsonObject.ee_BASIC_info[keyg];
					};
					tgt_elg.dispatchEvent(new Event('change'));
					tgt_elg.dispatchEvent(new Event('blur'));
					tgt_elg.dispatchEvent(new Event('focusout'));
				}
			};
			var sex_g = jsonObject.ee_BASIC_info['GENDER'];
			if (sex_g != '') {
				if (sex_g == 'F' || sex_g == 'Female') {
					sex_g = 'Female'
				} else if (sex_g == 'M' || sex_g == 'Male') {
					sex_g = 'Male'
				};
				input_refresh('gender', sex_g);
			};
		}
	};
	if (document.domain == "visionbenefits.vsp.com") {
		const dic = {
			"FIRST_NAME": "firstname",
			"LAST_NAME": "lastname",
			"PERSONAL_EMAIL": "emailHome",
			"ADD1": "street",
			"ADDCITY": "city",
			"ADD2": "street2",
			"ADDZIP": "zip",
			"HOMEPHONE": "phone",
			"ADDSTATE": "state",
		};
		for (var keyv in dic) {
			var itemv = dic[keyv];
			if (itemv != '') {
				var tgt_elv = document.getElementById(itemv);
				tgt_elv.dispatchEvent(new Event('focusin'));
				tgt_elv.value = jsonObject.ee_BASIC_info[keyv];
				tgt_elv.dispatchEvent(new Event('change'));
				tgt_elv.dispatchEvent(new Event('blur'));
				tgt_elv.dispatchEvent(new Event('focusout'));
			};
		};
		var doh = jsonObject.ee_BASIC_info['DOH'];
		if (doh != '') {
			var dob_dateObj = new Date(doh);
			document.getElementById('birthDate_month').value = dob_dateObj.getMonth();
			document.getElementById('birthDate_day').value = dob_dateObj.getDate();
			document.getElementById('birthDate_year').value = dob_dateObj.getFullYear();
		};
		var doe = jsonObject.ee_BASIC_info['ELIG_DATE'];
		if (doe != '') {
			var doe_dateObj = new Date(doe);
			document.getElementById('effDate_month').value = doe_dateObj.getMonth();
			document.getElementById('effDate_day').value = doe_dateObj.getDate();
			document.getElementById('effDate_year').value = doe_dateObj.getFullYear();
		};
		var sex_v = jsonObject.ee_BASIC_info['GENDER'];
		if (sex_v == 'F' || sex_v == 'Female') {
			sex_v = 'FEMALE'
		} else if (sex_v == 'M' || sex_v == 'Male') {
			sex_v = 'MALE'
		};
		document.getElementById('sex').value = sex_v;
	};
	if (document.domain == "secure-enroll.com") {
		function input_refresh(tgt_el_id, val) {
			tgt_elg = document.getElementById(tgt_el_id);
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};
		if (document.getElementById("SSN") != null) {
			const dic = {
				"SSN": "SSN",
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleName",
				"LAST_NAME": "lastName",
				"DOB": "birthDate",
				"ADD1": "address1",
				"ADD2": "address2",
				"ADDCITY": "city",
				"ADDZIP": "zip",
				"ADDCOUNTY": "county",
				"HOMEPHONE": "homePhone",
				"WORKPHONE": "cellPhone",
				"PERSONAL_EMAIL": "homeEmail",
				"DOH": "hireDate",
				"HOUR_PER_WEEK": "weeklyHours",
			};
			for (var keyv in dic) {
				var itemv = dic[keyv];
				if (itemv != '') {
					var tgt_elv = document.getElementById(itemv);
					tgt_elv.dispatchEvent(new Event('focusin'));
					tgt_elv.value = jsonObject.ee_BASIC_info[keyv];
					tgt_elv.dispatchEvent(new Event('change'));
					tgt_elv.dispatchEvent(new Event('blur'));
					tgt_elv.dispatchEvent(new Event('focusout'));
				};
			};
			var sex_v = jsonObject.ee_BASIC_info['GENDER'];
			if (sex_v == 'F' || sex_v == 'Female') {
				sex_v = 'F'
			} else if (sex_v == 'M' || sex_v == 'Male') {
				sex_v = 'M'
			};
			input_refresh('gender', sex_v);
		};
		if (document.getElementById("rawSsn") != null) {
			dept_dic = {
				"SSN": "rawSsn",
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleName",
				"LAST_NAME": "lastName",
				"DOB": "dob",
				"PERSONAL_EMAIL": "homeEmail"
			};
			if (jsonObject.ee_DEPT_info.Spouse.FIRST_NAME != "" && jsonObject.ee_DEPT_info.Spouse.is_entered == "") {
				for (var key in dept_dic) {
					var itemv = dept_dic[key];
					if (itemv != '') {
						var tgt_elv = document.getElementById(itemv);
						tgt_elv.dispatchEvent(new Event('focusin'));
						tgt_elv.value = jsonObject.ee_DEPT_info.Spouse[key];
						tgt_elv.dispatchEvent(new Event('change'));
						tgt_elv.dispatchEvent(new Event('blur'));
						tgt_elv.dispatchEvent(new Event('focusout'));
					};
				};
				var sex_v = jsonObject.ee_DEPT_info.Spouse['GENDER'];
				if (sex_v == 'F' || sex_v == 'Female') {
					sex_v = 'F'
				} else if (sex_v == 'M' || sex_v == 'Male') {
					sex_v = 'M'
				};
				input_refresh('gender', sex_v);
				input_refresh('relationship', 'SPOUSE');
				jsonObject.ee_DEPT_info.Spouse.is_entered = "T";
			} else if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				if (jsonObject.ee_DEPT_info.Child.FIRST_NAME.includes('|') == false) {
					if (jsonObject.ee_DEPT_info.Child.is_entered != "T") {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != "") {
								var tgt_elv = document.getElementById(itemv);
								tgt_elv.dispatchEvent(new Event('focusin'));
								tgt_elv.value = jsonObject.ee_DEPT_info.Child[keyv];
								tgt_elv.dispatchEvent(new Event('change'));
								tgt_elv.dispatchEvent(new Event('blur'));
								tgt_elv.dispatchEvent(new Event('focusout'));
							};
						};
						var sex_v = jsonObject.ee_DEPT_info.Child['GENDER'];
						if (sex_v == 'F' || sex_v == 'Female') {
							sex_v = 'F'
						} else if (sex_v == 'M' || sex_v == 'Male') {
							sex_v = 'M'
						};
						input_refresh('gender', sex_v);
						input_refresh('relationship', 'CHILD');
						jsonObject.ee_DEPT_info.Child.is_entered = "T";
					}
				} else {
					child_ct = jsonObject.ee_DEPT_info.Child.FIRST_NAME.split("|").length;
					if (jsonObject.ee_DEPT_info.Child.is_entered == "") {
						child_entered_ct = 0
					} else {
						child_entered_ct = jsonObject.ee_DEPT_info.Child.is_entered.split("|").length;
					};
					if (child_entered_ct <= child_ct) {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != '') {
								var tgt_elv = document.getElementById(itemv);
								tgt_elv.dispatchEvent(new Event('focusin'));
								tgt_elv.value = jsonObject.ee_DEPT_info.Child[keyv].split("|")[child_entered_ct];
								tgt_elv.dispatchEvent(new Event('change'));
								tgt_elv.dispatchEvent(new Event('blur'));
								tgt_elv.dispatchEvent(new Event('focusout'));
							};
						};
						var sex_v = jsonObject.ee_DEPT_info.Child['GENDER'].split("|")[child_entered_ct];
						if (sex_v == 'F' || sex_v == 'Female') {
							sex_v = 'F'
						} else if (sex_v == 'M' || sex_v == 'Male') {
							sex_v = 'M'
						};
						input_refresh('gender', sex_v);
						input_refresh('relationship', 'CHILD');
						if (child_entered_ct == 0) {
							jsonObject.ee_DEPT_info.Child.is_entered = "T"
						} else {
							jsonObject.ee_DEPT_info.Child.is_entered = jsonObject.ee_DEPT_info.Child.is_entered + "|" + "T";
						}
					}
				};
			};
		}
	};
	if (document.domain == "hp-mbr-admn.kp.org") {
		function input_refresh(tgt_el_id, val) {
			tgt_elg = document.getElementById(tgt_el_id);
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('input'));
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};

		function input_refresh_el(tgt_elg, val) {
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('input'));
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};
		if (document.getElementById("yes") == null) {
			const dic = {
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleNameControl",
				"LAST_NAME": "lastNameControl",
				"DOB": "dobid",
				"SSN": "ssnid",
				"ADD1": "addressInput",
				"ADDSTATE": "state",
				"ADDCITY": "city",
				"ADDZIP": "postal_code",
				"HOMEPHONE": "homePhone",
				"WORKPHONE": "workPhone",
				"PERSONAL_EMAIL": "emailid",
			};
			for (var keyv in dic) {
				var itemv = dic[keyv];
				if (itemv != '') {
					if (itemv == "dobid") {
						g_doh = new Date(jsonObject.ee_BASIC_info[keyv]);
						input_refresh(itemv, getFormattedDate(g_doh));
					} else {
						input_refresh(itemv, jsonObject.ee_BASIC_info[keyv]);
					};
				};
			};
			var sex_v = jsonObject.ee_BASIC_info['GENDER'];
			if (sex_v == 'F' || sex_v == 'Female') {
				sex_v = 'Female'
			} else if (sex_v == 'M' || sex_v == 'Male') {
				sex_v = 'Male'
			};
			var allPageTags = document.getElementById('accountRole_enrollAddFamily').getElementsByTagName("select");
			for (i = 0; i < allPageTags.length; i++) {
				tgt_elg = allPageTags[i];
				input_refresh_el(tgt_elg, sex_v);
			}
		};
		if (document.getElementById("yes") != null || document.getElementById("coverageDate") != null) {
			dept_dic = {
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleNameControl",
				"LAST_NAME": "lastName",
				"DOB": "dobid",
				"SSN": "ssnid",
			};
			if (jsonObject.ee_DEPT_info.Spouse.FIRST_NAME != "" && jsonObject.ee_DEPT_info.Spouse.is_entered == "") {
				for (var key in dept_dic) {
					var itemv = dept_dic[key];
					var tgt_elv = document.getElementById(itemv).children[0];
					if (tgt_elv != null) {
						if (itemv == "dobid") {
							g_doh = new Date(jsonObject.ee_DEPT_info.Spouse[key]);
							input_refresh_el(tgt_elv, getFormattedDate(g_doh));
						} else {
							input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Spouse[key]);
						};
					};
				};
				var sex_v = jsonObject.ee_DEPT_info.Spouse['GENDER'];
				if (sex_v == 'F' || sex_v == 'Female') {
					sex_v = 'Female'
				} else if (sex_v == 'M' || sex_v == 'Male') {
					sex_v = 'Male'
				};
				var allPageTags = document.getElementById('accountRole_enrollAddFamily').getElementsByTagName("select");
				for (i = 0; i < allPageTags.length; i++) {
					tgt_elg = allPageTags[i];
					input_refresh_el(tgt_elg, sex_v);
				}
				jsonObject.ee_DEPT_info.Spouse.is_entered = "T";
			} else if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				if (jsonObject.ee_DEPT_info.Child.FIRST_NAME.includes('|') == false) {
					if (jsonObject.ee_DEPT_info.Child.is_entered != "T") {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != "") {
								var tgt_elv = document.getElementById(itemv).children[0];
								if (tgt_elv != null) {
									if (itemv == "dobid") {
										g_doh = new Date(jsonObject.ee_DEPT_info.Child[keyv]);
										input_refresh_el(tgt_elv, getFormattedDate(g_doh));
									} else {
										input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Child[keyv]);
									};
								};
							};
						};
						var sex_v = jsonObject.ee_DEPT_info.Child['GENDER'];
						if (sex_v == 'F' || sex_v == 'Female') {
							sex_v = 'Female'
						} else if (sex_v == 'M' || sex_v == 'Male') {
							sex_v = 'Male'
						};
						var allPageTags = document.getElementById('accountRole_enrollAddFamily').getElementsByTagName("select");
						for (i = 0; i < allPageTags.length; i++) {
							tgt_elg = allPageTags[i];
							input_refresh_el(tgt_elg, sex_v);
						}
						jsonObject.ee_DEPT_info.Child.is_entered = "T";
					}
				} else {
					child_ct = jsonObject.ee_DEPT_info.Child.FIRST_NAME.split("|").length;
					if (jsonObject.ee_DEPT_info.Child.is_entered == "") {
						child_entered_ct = 0
					} else {
						child_entered_ct = jsonObject.ee_DEPT_info.Child.is_entered.split("|").length;
					};
					if (child_entered_ct <= child_ct) {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != '') {
								var tgt_elv = document.getElementById(itemv).children[0];
								if (tgt_elv != null) {
									if (itemv == "dobid") {
										g_doh = new Date(jsonObject.ee_DEPT_info.Child[keyv].split("|")[child_entered_ct]);
										input_refresh_el(tgt_elv, getFormattedDate(g_doh));
									} else {
										input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Child[keyv].split("|")[child_entered_ct]);
									};
								};
							};
						};
						if (child_entered_ct == 0) {
							jsonObject.ee_DEPT_info.Child.is_entered = "T"
						} else {
							jsonObject.ee_DEPT_info.Child.is_entered = jsonObject.ee_DEPT_info.Child.is_entered + "|" + "T";
						}
					}
				};
			};
		}
	};
	if (document.domain == "employereservices.optum.com") {
		function input_refresh(tgt_el_id, val) {
			tgt_elg = document.getElementById(tgt_el_id);
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('input'));
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};

		function input_refresh_el(tgt_elg, val) {
			tgt_elg.dispatchEvent(new Event('focusin'));
			tgt_elg.value = val;
			tgt_elg.dispatchEvent(new Event('input'));
			tgt_elg.dispatchEvent(new Event('change'));
			tgt_elg.dispatchEvent(new Event('blur'));
			tgt_elg.dispatchEvent(new Event('focusout'));
		};
		if (document.getElementById("employeeId") == null) {
			const dic = {
				"FIRST_NAME": "firstName",
				"MIDDLE_NAME": "middleInitial",
				"LAST_NAME": "lastName",
				"ID": "employeeId",
				"DOB": "dateOfBirth",
				"DOH": "dateOfHire",
				"SSN": "ssn",
				"ADD1": "addressLineOne",
				"ADD2": "addressLineTwo",
				"ADDSTATE": "addressState",
				"ADDCITY": "addressCity",
				"ADDZIP": "addressZipCode",
				"HOMEPHONE": "addressHomePhone",
				"WORKPHONE": "addressWorkPhone",
				"PERSONAL_EMAIL": "addressEmailAddress",
			};
			for (var keyv in dic) {
				var itemv = dic[keyv];
				if (itemv != '') {
					var el = document.getElementById('ff-iframe').contentWindow.document.getElementById(itemv);
					if (el != null) {
						if (itemv == "dateOfBirth" || itemv == "dateOfHire") {
							g_doh = new Date(jsonObject.ee_BASIC_info[keyv]);
							input_refresh_el(el, getFormattedDate(g_doh));
						} else {
							input_refresh_el(el, jsonObject.ee_BASIC_info[keyv]);
						};
					};
				};
			};
			var sex_v = jsonObject.ee_BASIC_info['GENDER'];
			if (sex_v == 'F' || sex_v == 'Female') {
				sex_v = 'F'
			} else if (sex_v == 'M' || sex_v == 'Male') {
				sex_v = 'M'
			};
			input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('gender'), sex_v);
		};
		if (document.getElementById('ff-iframe').contentWindow.document.getElementById('content-section-wrap-dependent') != null) {
			dept_dic = {
				"FIRST_NAME": "depFirstName0",
				"MIDDLE_NAME": "depMiddleInitial0",
				"LAST_NAME": "depLastName0",
				"DOB": "depDateofBirth0",
				"SSN": "depSsn0",
			};
			if (jsonObject.ee_DEPT_info.Spouse.FIRST_NAME != "" && jsonObject.ee_DEPT_info.Spouse.is_entered == "") {
				for (var key in dept_dic) {
					var itemv = dept_dic[key];
					var tgt_elv = document.getElementById('ff-iframe').contentWindow.document.getElementById(itemv);
					if (tgt_elv != null) {
						if (itemv == "depDateofBirth0") {
							g_doh = new Date(jsonObject.ee_DEPT_info.Spouse[key]);
							input_refresh_el(tgt_elv, getFormattedDate(g_doh));
						} else {
							input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Spouse[key]);
						};
					};
				};
				var sex_v = jsonObject.ee_DEPT_info.Spouse['GENDER'];
				if (sex_v == 'F' || sex_v == 'Female') {
					sex_v = 'F'
				} else if (sex_v == 'M' || sex_v == 'Male') {
					sex_v = 'M'
				};
				input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depGender0'), sex_v);
				input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depRelationShip0'), 'SP');
				jsonObject.ee_DEPT_info.Spouse.is_entered = "T";
			} else if (jsonObject.ee_DEPT_info.Child.FIRST_NAME != "") {
				if (jsonObject.ee_DEPT_info.Child.FIRST_NAME.includes('|') == false) {
					if (jsonObject.ee_DEPT_info.Child.is_entered != "T") {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != "") {
								var tgt_elv = document.getElementById('ff-iframe').contentWindow.document.getElementById(itemv.replace('0', '1'));
								if (tgt_elv != null) {
									if (itemv == "depDateofBirth1") {
										g_dohs = new Date(jsonObject.ee_DEPT_info.Child[keyv]);
										input_refresh_el(tgt_elv, getFormattedDate(g_dohs));
									} else {
										input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Child[keyv]);
									};
								};
							};
						};
						var sex_v = jsonObject.ee_DEPT_info.Child['GENDER'];
						if (sex_v == 'F' || sex_v == 'Female') {
							sex_v = 'F'
						} else if (sex_v == 'M' || sex_v == 'Male') {
							sex_v = 'M'
						};
						input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depGender1'), sex_v);
						input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depRelationShip1'), 'CH');
						jsonObject.ee_DEPT_info.Child.is_entered = "T";
					}
				} else {
					child_ct = jsonObject.ee_DEPT_info.Child.FIRST_NAME.split("|").length;
					if (jsonObject.ee_DEPT_info.Child.is_entered == "") {
						child_entered_ct = 0
					} else {
						child_entered_ct = jsonObject.ee_DEPT_info.Child.is_entered.split("|").length
					};
					if (child_entered_ct <= child_ct) {
						for (var keyv in dept_dic) {
							var itemv = dept_dic[keyv];
							if (itemv != '' && jsonObject.ee_DEPT_info.Child[keyv] != '') {
								var tgt_elv = document.getElementById('ff-iframe').contentWindow.document.getElementById(itemv.replace('0', (child_entered_ct + 1)));
								if (tgt_elv != null) {
									if (itemv == "depDateofBirth0") {
										g_dohcs = new Date(jsonObject.ee_DEPT_info.Child[keyv].split("|")[child_entered_ct]);
										input_refresh_el(tgt_elv, getFormattedDate(g_dohcs));
									} else {
										input_refresh_el(tgt_elv, jsonObject.ee_DEPT_info.Child[keyv].split("|")[child_entered_ct]);
									};
								};
							};
						};
						var sex_v = jsonObject.ee_DEPT_info.Child['GENDER'].split("|")[child_entered_ct];
						if (sex_v == 'F' || sex_v == 'Female') {
							sex_v = 'F'
						} else if (sex_v == 'M' || sex_v == 'Male') {
							sex_v = 'M'
						};
						input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depGender' + (child_entered_ct + 1)), sex_v);
						input_refresh_el(document.getElementById('ff-iframe').contentWindow.document.getElementById('depRelationShip' + (child_entered_ct + 1)), 'CH');
						if (child_entered_ct == 0) {
							jsonObject.ee_DEPT_info.Child.is_entered = "T"
						} else {
							jsonObject.ee_DEPT_info.Child.is_entered = jsonObject.ee_DEPT_info.Child.is_entered + "|" + "T";
						}
					}
				};
			};
		}
	};
	let newClipboardString = JSON.stringify(jsonObject);
	navigator.clipboard.writeText(newClipboardString);
});
