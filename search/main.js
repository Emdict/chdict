var ts = new Array();
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
	if (search_key == "") window.location.href = "../index.html";
	else {
		var res = bs(search_key);
		if (res == 0) res = 1;
		window.location.href = res+".html?q="+search_key;
	}
}

function search2(key) {
	//alert("search");
	//search_key = document.getElementById("search").value.toLowerCase();
	var id = bs2(key);
	if (id < 0) id = -id - 1;
	var res = x[id].split("#");
	var title = res[0];
	ts = new Array();
	var ex = false;
	while (title.startWith(key)) {
		ts.push(res[1]+"#"+res[2]+"#"+res[3]);
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
	if (!ex) next = ex;
	if (ts.length == 0) document.getElementById("result").innerHTML = "无结果";
	else {
		ts.sort();
		getPage(1);
	}
}

function getPage(p) {
	var cont = "";
	var max = p * 30;
	if (max > ts.length) max = ts.length;
	for (var i=(p-1)*30; i<max; i++) {
		res = ts[i].split("#");
		title = res[1];
		if (title.indexOf("|") >= 0) {
			cont += "<li><d>"+title.replace("|", "</d><py>")+"</py>";
		} else cont += "<li>"+title;
		cont += "<c>"+res[2]+"</c></li>";
	}
	if (next) cont = "+ 个词条</div><ul>" + cont;
	else cont = " 个词条</div><ul>" + cont;
	var page = "<div class='pages'>";
	if (ts.length > 30) {
		for (var i=1; i<p; i++) {
			page += "<a href='javascript:getPage("+i+")'><page>"+i+"</page></a>";
		}
		page += "<page class='sel'>"+p+"</page>";
		var pg = (ts.length + 29) / 30;
		for (var i=p+1; i<pg; i++) {
			page += "<a href='javascript:getPage("+i+")'><page>"+i+"</page></a>";
		}
	}
	document.getElementById("result").innerHTML = "<div>共 " + ts.length + cont + "</ul>" + page + "</div>";
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