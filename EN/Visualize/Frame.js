function create_tb(a_array) {
	let floatWindow_body = document.getElementsByTagName('body')[0];
	let floatWindow_div = document.createElement('div');

	/* Expanded background color */
	floatWindow_div.style.backgroundColor = 'rgba(238, 233, 12)';
	/* The expansion speed will be slower */
	floatWindow_div.style.height = '0px';
	floatWindow_div.style.width = '0px';
	floatWindow_div.style.transition = 'width 1s';
	floatWindow_div.style.transition = 'height 1s cubic-bezier(0.25, 0.1, 0, 0.48) 0s';

	floatWindow_div.style.display = 'block';

	/* Block size and color */
	floatWindow_div.style.border = '25px solid rgba(238, 233, 12,1)';
	/* blunt corners */
	floatWindow_div.style.borderRadius = '25px';
	/* pin to top */
	/* Sets the Z-order of the positioned element and its descendants or flex items. Overlapping elements with a larger z-index overwrite smaller elements. */
	floatWindow_div.style.zIndex = '9999';
	/* absolute position */
	floatWindow_div.style.position = 'absolute';

	floatWindow_div.style.top = '0px';
	floatWindow_div.style.left = '100px';
	floatWindow_div.style.overflow = 'hidden';


	floatWindow_div.style.overflowX = 'auto';
	floatWindow_div.style.overflowY = 'auto';

	let floatWindow_div_div = document.createElement('div');
	floatWindow_div_div.style.display = 'flex';
	floatWindow_div_div.style.flexWrap = 'wrap';
	floatWindow_div_div.style.justifyContent = 'space-between';
	floatWindow_div_div.style.overflow = 'hidden';
	/* floatWindow_div_div.style.overflowX='auto'; */
	/* floatWindow_div_div.style.overflowY='auto'; */
	floatWindow_div_div.style.zIndex = '10';
	floatWindow_div_div.style.position = 'absolute';

	let floatWindow_div_div_table = document.createElement('table');
	floatWindow_div_div_table.style.tableLayout = 'fixed';
	floatWindow_div_div_table.style.borderCollapse = 'collapse';
	floatWindow_div_div_table.style.width = '95%';

	let floatWindow_div_div_table_tbody = document.createElement('tbody');
	for (let i = 0; i < a_array.length; i++) {
		let floatWindow_div_div_table_tr = document.createElement('tr');

		let floatWindow_div_div_table_td1 = document.createElement('td');
		floatWindow_div_div_table_td1.vAlign = "top";

		let floatWindow_div_div_table_td1_input = document.createElement('input');
		floatWindow_div_div_table_td1_input.setAttribute('class', "PopUpWindowSelection");
		floatWindow_div_div_table_td1_input.type = "radio";
		floatWindow_div_div_table_td1_input.name = "radio1";
		floatWindow_div_div_table_td1_input.style.background = 'rgb(255,255,255)';

		const keys = Object.keys(a_array[i]);
		floatWindow_div_div_table_td1_input.value = keys[0];

		floatWindow_div_div_table_td1_input.setAttribute('refvalue', a_array[i][keys[0]]);
		floatWindow_div_div_table_td1_input.onclick = function() {
			console.log(floatWindow_div_div_table_td1_input.value);
			document.querySelector("#kw").value = floatWindow_div_div_table_td1_input.getAttribute('refvalue')
		}

		let floatWindow_div_div_table_td2 = document.createElement('td');
		floatWindow_div_div_table_td2.style.width = '15%';
		floatWindow_div_div_table_td2.style.color = 'rgb(0, 0, 0)';

		let floatWindow_div_div_table_td2_label = document.createElement('label');
		floatWindow_div_div_table_td2_label.textContent = keys[0];
		floatWindow_div_div_table_td2_label.style.fontSize = '15px';


		let floatWindow_div_div_table_td3 = document.createElement('td');
		floatWindow_div_div_table_td3.style.width = '75%';
		floatWindow_div_div_table_td3.style.color = 'rgb(0, 0, 0)';

		let floatWindow_div_div_table_td3_label = document.createElement('label');
		floatWindow_div_div_table_td3_label.textContent = a_array[i][keys[0]];
		floatWindow_div_div_table_td3_label.style.fontSize = '15px';




		floatWindow_div_div_table_td1.appendChild(floatWindow_div_div_table_td1_input);
		floatWindow_div_div_table_td2.appendChild(floatWindow_div_div_table_td2_label);
		floatWindow_div_div_table_td3.appendChild(floatWindow_div_div_table_td3_label);

		floatWindow_div_div_table_tr.appendChild(floatWindow_div_div_table_td1);
		floatWindow_div_div_table_tr.appendChild(floatWindow_div_div_table_td2);
		floatWindow_div_div_table_tr.appendChild(floatWindow_div_div_table_td3);


		floatWindow_div_div_table_tbody.appendChild(floatWindow_div_div_table_tr);
		floatWindow_div_div_table.appendChild(floatWindow_div_div_table_tbody);
	}

	floatWindow_div_div.appendChild(floatWindow_div_div_table);
	floatWindow_div.appendChild(floatWindow_div_div);

	floatWindow_body.appendChild(floatWindow_div);


	floatWindow_div.ondblclick = function(e) {
		e.selfPropagation();
	};
	document.onselectstart = new Function("return false");
	/* 添加一个展开过渡效果 */
	let num = 1;
	floatWindow_div.ondblclick = function() {

		if (num % 2 == 0) {
			floatWindow_div.style.height = '0px';
			floatWindow_div.style.width = '0px';
			floatWindow_div.style.border = '25px solid rgba(229,229,229,1)';
		} else {
			floatWindow_div.style.height = '400px';
			floatWindow_div.style.width = '600px';
			floatWindow_div.style.border = '25px solid rgba(229,229,229,0)';
		}
		num++;
	};

	/* 添加拖拽效果 */
	function move() {
		if (floatWindow_div == null) return;
		floatWindow_div.onmousedown = function(e) {
			let ev = e || window.event; /* 兼容ie浏览器 */
			/* 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离 */
			let distanceX = ev.clientX - floatWindow_div.offsetLeft;
			let distanceY = ev.clientY - floatWindow_div.offsetTop;
			document.onmousemove = function(e) {
				let ev = e || window.event; /* 兼容ie浏览器 */
				floatWindow_div.style.left = ev.clientX - distanceX + 'px';
				floatWindow_div.style.top = ev.clientY - distanceY + 'px';
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	};
	move();
}




let a_array = new Array();
a_array = [{
	'a': 'A(123456)(L)'
}, {
	'b': 'b(123456)(L)'
}, {
	'c': 'C(123456)(c)'
}, {
	'd': 'D(123456)(d)'
}];

create_tb(a_array)
