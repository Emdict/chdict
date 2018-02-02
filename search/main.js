function init() {
	var url = window.location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1).split("=");
		if (str[1].length == 0) window.location.href = "../index.html";
		else {
			search_key = decodeURI(str[1]);
			document.getElementById("search").value = search_key;
			search2(search_key);
		}
	}
}

function search() {
	//alert("search");
	search_key = document.getElementById("search").value.toLowerCase();
	var res = bs(search_key);
	if (res == 0) res = 1;
	window.location.href = res+".html?q="+search_key;
}

function search2(key) {
	//alert("search");
	//search_key = document.getElementById("search").value.toLowerCase();
	var id = bs2(key);
	if (id < 0) id = -id - 1;
	var res = x[id].split("#");
	var title = res[0];
	var cont = "";
	var count = 0;
	var ts = new Array();
	var ex = false;
	while (title.startWith(key)) {
		count++;
		ts.push(res[1]+"#"+res[2]);
		//var index = Number(res[1]);
		//cont += "<li>"+t[index].replace(/{/g, "<span class='small'>").replace(/}/g, "</span>")+"</li>";
		id++;
		if (id >= x.length) {
			ex = true;
			break;
		}
		res = x[id].split("#");
		title = res[0];
	}
	if (count == 0) document.getElementById("result").innerHTML = "无结果";
	else {
		ts.sort();
		for (var i=0; i<count; i++) {
			title = ts[i].split("#")[1];
			if (title.indexOf("|") >= 0) {
				cont += "<li>"+title.replace("|", " <py>")+"</py></li>";
			} else cont += "<li>"+title+"</li>";
		}
		if (ex) ex = next;
		if (ex) cont = "+ 个词条</div><ul>" + cont;
		else cont = " 个词条</div><ul>" + cont;
		document.getElementById("result").innerHTML = "<div>共 " + count + cont + "</ul>";
	}
}

function bs(key) {
	//alert(key);
	var low = 0;
	var high = xs.length-1;
	//alert(low+", "+high);
	while (low < high) {
		var mid = (low + high) >> 1;
		//alert(mid);
		//var cmp = xs[mid];
		if (xs[mid] < key) {
			low = mid + 1;
		} else //if (cmp[0] > key) {
			high = mid;
		//} else return mid;
	}
	//if (key == xs[low]) return low;
	return low;
}

function bs2(key) {
	//alert(key);
	var low = 0;
	var high = x.length-1;
	//alert(low+", "+high);
	while (low < high) {
		var mid = (low + high) >> 1;
		//alert(mid);
		var cmp = x[mid].split("#");
		//alert(cmp[0]+" "+key);
		if (cmp[0] < key) {
			low = mid + 1;
		} else //if (cmp[0] > key) {
			high = mid;
		//} else return mid;
	}
	if (key == x[low].split("#")[0]) return low;
	return -(low + 1);
}

String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		 return true;
	else
		return false;
	return true;
}