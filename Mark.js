javascript: navigator.clipboard.readText().then((clipboardString) => {
	const obj = JSON.parse(clipboardString);

	function get_sel(x) {
		var res = "";
		for (var i = 0; i < x.options.length; i++) {
			if (x.options[i].value == x.value) {
				res = x.options[i].textContent;
			}
		};
		return (res)
	}
	var dic = {};
	if (document.domain == "guardian.benselect.com") {
		dic = {
			"SSN": "ControlText_bodyContent_Tab_MainFrame_txtSSN",
			"ID": "bodyContent_Tab_MainFrame_txtEID",
			"DATE_OF_HIRE": "bodyContent_Tab_MainFrame_txtDateOfHire",
			"ELIG_DATE": "bodyContent_Tab_MainFrame_txtEligibilityDate",
			"TERM_DATE": "bodyContent_Tab_MainFrame_txtTerminationDate",
			"HOUR_PER_WEEK": "bodyContent_Tab_MainFrame_txtHoursPerWeek",
			"ANNUAL_SALARY": "bodyContent_Tab_MainFrame_txtSalaryValue",
			"FIRST_NAME": "bodyContent_Tab_MainFrame_txtFirstName",
			"MIDDLE_NAME": "bodyContent_Tab_MainFrame_txtMiddleInit",
			"LAST_NAME": "bodyContent_Tab_MainFrame_txtLastName",
			"DOB": "bodyContent_Tab_MainFrame_txtDOB",
			"ADD1": "bodyContent_Tab_MainFrame_AddressCtrl_addressCtrlLine1",
			"ADD2": "bodyContent_Tab_MainFrame_AddressCtrl_addressCtrlLine2",
			"ADDCITY": "bodyContent_Tab_MainFrame_AddressCtrl_addressCtrlCity",
			"ADDZIP": "bodyContent_Tab_MainFrame_AddressCtrl_addressCtrlZip",
			"HOMEPHONE": "bodyContent_Tab_MainFrame_txtHomePhone",
			"WORK_EMAIL": "bodyContent_Tab_MainFrame_txtEmail"
		};
		for (key in dic) {
			if (document.getElementById(dic[key]) != null) {
				if (document.getElementById(dic[key]).value != "") {
					if (key in obj.ee_BASIC_info) {
						obj.ee_BASIC_info[key] = document.getElementById(dic[key]).value
					}
				}
			}
		};
		if (document.getElementById("bodyContent_Tab_MainFrame_rbtGenderMale") != null) {
			if (document.getElementById("bodyContent_Tab_MainFrame_rbtGenderMale").getAttribute("checked") != null) {
				obj.ee_BASIC_info.GENDER = "M";
			};
			if (document.getElementById("bodyContent_Tab_MainFrame_rbtGenderFemale").getAttribute("checked") != null) {
				obj.ee_BASIC_info.GENDER = "F";
			};
		};
		if (document.getElementById("bodyContent_Tab_MainFrame_grdDependent") != null) {
			var table = document.getElementById("bodyContent_Tab_MainFrame_grdDependent");
			var rows = table.rows;
			for (var i = 1; i < rows.length; i += 1) {
				var Tr = rows[i];
				ssn = Tr.cells[1].firstChild.getAttribute("data-original-title");
				name = Tr.cells[2].textContent;
				dob = Tr.cells[3].textContent;
				gender = Tr.cells[4].textContent;
				relation = Tr.cells[5].textContent;
				student = Tr.cells[6].textContent;
				if (relation in obj.ee_DEPT_info) {
					if (obj.ee_DEPT_info[relation]["SSN"] == "") {
						obj.ee_DEPT_info[relation]["SSN"] = ssn;
						obj.ee_DEPT_info[relation]["DOB"] = dob;
						obj.ee_DEPT_info[relation]["FULL_NAME"] = name;
						obj.ee_DEPT_info[relation]["GENDER"] = gender;
						obj.ee_DEPT_info[relation]["IF_STUDENT"] = student;
						obj.ee_DEPT_info[relation]["RELATION"] = relation;
					} else {
						obj.ee_DEPT_info[relation]["SSN"] = obj.ee_DEPT_info[relation]["SSN"] + "|" + ssn;
						obj.ee_DEPT_info[relation]["DOB"] = obj.ee_DEPT_info[relation]["DOB"] + "|" + dob;
						obj.ee_DEPT_info[relation]["FULL_NAME"] = obj.ee_DEPT_info[relation]["FULL_NAME"] + "|" + name;
						obj.ee_DEPT_info[relation]["GENDER"] = obj.ee_DEPT_info[relation]["GENDER"] + "|" + gender;
						obj.ee_DEPT_info[relation]["IF_STUDENT"] = obj.ee_DEPT_info[relation]["IF_STUDENT"] + "|" + student;
						obj.ee_DEPT_info[relation]["RELATION"] = obj.ee_DEPT_info[relation]["RELATION"] + "|" + relation;
					};
				};
			};
		};
	}
	if (document.domain == "secure.bswift.com") {
		if (document.getElementById("MasterPage_ctl00_Base_Content_pageContent_WrapperMemberView") != null) {
			dic = {
				"SSN": "Social Security Number",
				"ID": "Employee ID",
				"DOH": "Hire Date",
				"ELIG_DATE": "",
				"TERM_DATE": "",
				"FIRST_NAME": "First Name",
				"MIDDLE_NAME": "Middle Initial",
				"LAST_NAME": "Last Name",
				"DOB": "Date of Birth",
				"ADD1": "Address 1",
				"ADD2": "Address 2",
				"ADDCITY": "City",
				"ADDSTATE": "State",
				"ADDZIP": "Zip",
				"HOMEPHONE": "Home Phone",
				"WORK_EMAIL": "Work Email",
				"PERSONAL_EMAIL": "Home Email",
				"GENDER": "Gender",
				"HOUR_PER_WEEK": "Hours per Week",
				"ANNUAL_SALARY": "Annual Salary",
			};
			var allPageTags = document.getElementsByTagName("td");
			for (i = 0; i < allPageTags.length; i++) {
				for (var key in dic) {
					if (allPageTags[i].textContent != "") {
						if (dic[key] == allPageTags[i].textContent) {
							obj.ee_BASIC_info[key] = allPageTags[i].nextElementSibling.textContent;
						}
					}
				}
			};
		}
		if (document.getElementById("depInfoRelationshipMaskedID") != null) {
			dic_dep = {
				"FIRST_NAME": "depInfoFirstName",
				"MIDDLE_NAME": "depInfoMiddleInitial",
				"LAST_NAME": "depInfoLastName",
				"DOB": "depInfoBirthDate",
				"SSN": "depInfoSSN",
				"ADD1": "depAddressAddressLine1",
				"ADD2": "depAddressAddressLine2",
				"ADDCITY": "depAddressCity",
				"ADDZIP": "depAddressZip",
				"ADDCOUNTY": "depAddressCounty"
			};
			var x = document.getElementById("depInfoRelationshipMaskedID");
			relation = get_sel(x);
			if (relation in obj.ee_DEPT_info) {
				if (obj.ee_DEPT_info[relation]["FIRST_NAME"] == "") {
					for (key in dic_dep) {
						if (document.getElementById(dic_dep[key]) != null) {
							if (document.getElementById(dic_dep[key]).value != "") {
								if (key in obj.ee_DEPT_info[relation]) {
									obj.ee_DEPT_info[relation][key] = document.getElementById(dic_dep[key]).value
								}
							}
						}
					};
					if (document.getElementById("depInfoGender0") != null) {
						if (document.getElementById("depInfoGender0").getAttribute("checked") != null) {
							obj.ee_DEPT_info[relation].GENDER = "M"
						};
						if (document.getElementById("depInfoGender1").getAttribute("checked") != null) {
							obj.ee_DEPT_info[relation].GENDER = "F"
						};
					};
				} else {
					for (key in dic_dep) {
						if (document.getElementById(dic_dep[key]) != null) {
							if (document.getElementById(dic_dep[key]).value != "") {
								if (key in obj.ee_DEPT_info[relation]) {
									obj.ee_DEPT_info[relation][key] = obj.ee_DEPT_info[relation][key] + "|" + document.getElementById(dic_dep[key]).value
								}
							}
						}
					};
					if (document.getElementById("depInfoGender0") != null) {
						if (document.getElementById("depInfoGender0").getAttribute("checked") != null) {
							obj.ee_DEPT_info[relation].GENDER = obj.ee_DEPT_info[relation].GENDER + "|" + "M"
						};
						if (document.getElementById("depInfoGender1").getAttribute("checked") != null) {
							obj.ee_DEPT_info[relation].GENDER = obj.ee_DEPT_info[relation].GENDER + "|" + "F"
						};
					};
				};
			}
		}
	};
	if (document.domain == "theabdteam.ease.com") {
		if (document.getElementById("detailsModal") != null) {
			if (document.getElementById("detailsModal").getAttribute("class") == "c-modal c-modal--responsive c-modal__background fadeInTop") {
				dic = {
					"DATE_OF_HIRE": "Hire Date",
					"FULL_PART_TIME": "Type",
					"TERM_REASON": "Termination Reason",
					"HOURLY_SALARY": "Compensation",
					"HOUR_PER_WEEK": "Hours",
					"JOB_TITLE": "Job Title",
					"WORK_EMAIL": "Email",
					"PERSONAL_EMAIL": "Personal Email",
					"HOMEPHONE": "Personal Phone",
					"WORKPHONE": "Work Phone",
				};
				var el_up = document.getElementsByClassName('c-modal__body')[0].getElementsByClassName('o-input-groups')[0];
				var allPageTags = el_up.getElementsByTagName("strong");
				for (key in dic) {
					for (i = 0; i < allPageTags.length; i++) {
						var info = allPageTags[i].parentElement.textContent;
						t_title = info.split(":")[0];
						t_value = info.split(":")[1];
						if (dic[key] == t_title) {
							if (key == 'HOURLY_SALARY') {
								obj.ee_BASIC_info[key] = t_value.split('/')[0].trim()
							} else {
								obj.ee_BASIC_info[key] = t_value.trim()
							}
						}
					}
				};
				var el_down = document.getElementsByClassName('c-modal__body')[0].getElementsByClassName('c-list-view')[0].getElementsByClassName('c-list-view__body')[0];
				var erow = el_down.getElementsByClassName("e-row");
				for (i = 0; i < erow.length; i++) {
					var ediv = erow[i].getElementsByTagName("div");
					relation = ediv[1].textContent.trim();
					if (relation in obj.ee_DEPT_info) {
						if (obj.ee_DEPT_info[relation]["FIRST_NAME"] == "") {
							obj.ee_DEPT_info[relation]["FIRST_NAME"] = ediv[0].children[0].textContent.trim();
							obj.ee_DEPT_info[relation]["LAST_NAME"] = ediv[0].children[1].textContent.trim();
							obj.ee_DEPT_info[relation]["SSN"] = ediv[2].textContent.trim();
							obj.ee_DEPT_info[relation]["GENDER"] = ediv[3].textContent.trim()[0];
							obj.ee_DEPT_info[relation]["DOB"] = ediv[4].textContent.split(" ")[0].trim();
						} else {
							obj.ee_DEPT_info[relation]["FIRST_NAME"] = obj.ee_DEPT_info[relation]["FIRST_NAME"] + "|" + ediv[0].children[0].textContent.trim();
							obj.ee_DEPT_info[relation]["LAST_NAME"] = obj.ee_DEPT_info[relation]["LAST_NAME"] + "|" + ediv[0].children[1].textContent.trim();
							obj.ee_DEPT_info[relation]["SSN"] = obj.ee_DEPT_info[relation]["SSN"] + "|" + ediv[2].textContent.trim();
							obj.ee_DEPT_info[relation]["GENDER"] = obj.ee_DEPT_info[relation]["GENDER"] + "|" + ediv[3].textContent.trim()[0];
							obj.ee_DEPT_info[relation]["DOB"] = obj.ee_DEPT_info[relation]["DOB"] + "|" + ediv[4].textContent.split(" ")[0].trim();
						};
					}
				}
			};
		} else {
			if (document.getElementById("dependentModalTrigger") == null) {
				dic = {
					"FIRST_NAME": "firstname",
					"MIDDLE_NAME": "middlename",
					"LAST_NAME": "lastname",
					"DOB": "birthdate",
					"SSN": "ssn",
					"ADD1": "addr1",
					"ADD2": "addr2",
					"ADDZIP": "zip",
					"HOMEPHONE": "homephone",
					"WORKPHONE": "workphone",
					"ADDCITY": "city",
					"ADDCOUNTY": "county",
					"DOH": "hiredate",
					"HOUR_PER_WEEK": "hours",
				};
				for (key in dic) {
					if (document.getElementById(dic[key]) != null) {
						if (document.getElementById(dic[key]).value != "") {
							if (key in obj.ee_BASIC_info) {
								obj.ee_BASIC_info[key] = document.getElementById(dic[key]).value
							}
						}
					}
				};
				if (document.getElementById('c-input__label-sex').parentElement.nextElementSibling != null) {
					obj.ee_BASIC_info.GENDER = document.getElementById('c-input__label-sex').parentElement.nextElementSibling.textContent
				};
			} else if (document.getElementById('dependentModalTrigger') != null) {
				var dept_obj = JSON.parse(document.getElementById('dependentModalTrigger').value);
				for (i = 0; i < dept_obj.data.length; i++) {
					if (dept_obj.data[i].key == "relationship") {
						relation = (dept_obj.data[i].value);
						break;
					}
				};
				if (relation in obj.ee_DEPT_info) {
					dic = {
						"FIRST_NAME": "firstname",
						"MIDDLE_NAME": "middlename",
						"LAST_NAME": "lastname",
						"GENDER": "sex",
						"DOB": "birthdate",
						"SSN": "ssn",
						"ADD1": "addr1",
						"ADD2": "addr2",
						"ADDZIP": "zip",
						"HOMEPHONE": "homephone",
						"WORKPHONE": "workphone",
						"ADDCITY": "city",
						"ADDCOUNTY": "county",
					};
					if (obj.ee_DEPT_info[relation]["FIRST_NAME"] == "") {
						for (i = 0; i < dept_obj.data.length; i++) {
							for (key in dic) {
								if (dept_obj.data[i].key == dic[key]) {
									obj.ee_DEPT_info[relation][key] = dept_obj.data[i].value
								}
							}
						};
					} else {
						for (i = 0; i < dept_obj.data.length; i++) {
							for (key in dic) {
								if (dept_obj.data[i].key == dic[key]) {
									obj.ee_DEPT_info[relation][key] = obj.ee_DEPT_info[relation][key] + "|" + dept_obj.data[i].value
								}
							}
						};
					}
				};
			};
		}
	};
	if (document.domain == "www.employeenavigator.com") {
		if (document.getElementById("LkpRelationshipId") == null) {
			dic = {
				"SSN": "SSN",
				"FIRST_NAME": "FirstName",
				"MIDDLE_NAME": "MiddleName",
				"LAST_NAME": "LastName",
				"JOB_TITLE": "JobTitle",
				"DATE_OF_HIRE": "HireDate",
				"DOB": "DOB",
			};
			for (key in dic) {
				if (document.getElementById(dic[key]) != null) {
					if (document.getElementById(dic[key]).value != "") {
						if (key in obj.ee_BASIC_info) {
							obj.ee_BASIC_info[key] = document.getElementById(dic[key]).value
						}
					}
				}
			};
			dic_sel = {
				"PAY_PERIOD": "LkpPayrollGroup",
				"DIVISION": "LkpDivision",
				"DEPARTMENT": "LkpDept",
			};
			for (key in dic_sel) {
				if (document.getElementById(dic[key]) != null) {
					if (get_sel(document.getElementById(dic_sel[key])) != "") {
						if (key in obj.ee_BASIC_info) {
							obj.ee_BASIC_info[key] = document.getElementById(dic_sel[key]).value
						}
					}
				}
			};
			if (document.getElementById("DOB") != null) {
				var allPageTags = document.getElementsByTagName("input");
				for (i = 0; i < allPageTags.length; i++) {
					if (allPageTags[i].name == 'Gender') {
						if (allPageTags[i].checked == true) {
							obj.ee_BASIC_info.GENDER = (allPageTags[i].value)
						}
					}
				}
			};
			if (window.__PROFILE_ADDRESS_LIST__ != null) {
				obj.ee_BASIC_info.ADD1 = window.__PROFILE_ADDRESS_LIST__[0].Address1;
				obj.ee_BASIC_info.ADD2 = window.__PROFILE_ADDRESS_LIST__[0].Address2;
				obj.ee_BASIC_info.ADDCITY = window.__PROFILE_ADDRESS_LIST__[0].City;
				obj.ee_BASIC_info.ADDZIP = window.__PROFILE_ADDRESS_LIST__[0].Zip;
			};
		};
		if (document.getElementById("LkpRelationshipId") != null) {
			dic_dep = {
				"FIRST_NAME": "FirstName",
				"MIDDLE_NAME": "MiddleName",
				"LAST_NAME": "LastName",
				"DOB": "DOB",
				"SSN": "SSN",
			};
			relation = get_sel(document.getElementById('LkpRelationshipId'));
			if (relation in obj.ee_DEPT_info) {
				if (obj.ee_DEPT_info[relation]["SSN"] == "") {
					for (key in dic_dep) {
						if (document.getElementById(dic_dep[key]) != null) {
							if (document.getElementById(dic_dep[key]).value != "") {
								if (key in obj.ee_DEPT_info[relation]) {
									obj.ee_DEPT_info[relation][key] = document.getElementById(dic_dep[key]).value
								}
							}
						}
					};
					var allPageTags = document.getElementById('edit_data_modal').getElementsByTagName("input");
					for (i = 0; i < allPageTags.length; i++) {
						if (allPageTags[i].name == 'Gender') {
							if (allPageTags[i].checked == true) {
								obj.ee_DEPT_info[relation].GENDER = (allPageTags[i].value)
							}
						}
					};
				} else {
					for (key in dic_dep) {
						if (document.getElementById(dic_dep[key]) != null) {
							if (document.getElementById(dic_dep[key]).value != "") {
								if (key in obj.ee_DEPT_info[relation]) {
									obj.ee_DEPT_info[relation][key] = obj.ee_DEPT_info[relation][key] + "|" + document.getElementById(dic_dep[key]).value
								}
							}
						}
					};
					var allPageTags = document.getElementById('edit_data_modal').getElementsByTagName("input");
					for (i = 0; i < allPageTags.length; i++) {
						if (allPageTags[i].name == 'Gender') {
							if (allPageTags[i].checked == true) {
								obj.ee_DEPT_info[relation].GENDER = obj.ee_DEPT_info[relation].GENDER + "|" + allPageTags[i].value
							}
						}
					};
				};
			}
		}
	}
	let newClipboardString = JSON.stringify(obj);
	navigator.clipboard.writeText(newClipboardString);
});
