// JavaScript template using Windows Script Host
var search_key;
function init() {
//	document.getElementById("search").bind('keydown',function(event) {
//		alert(event);
//		if(event.keyCode == "13") {
//			search();
//	}
//	});
}

function search() {
	//alert("search");
	search_key = document.getElementById("search").value.toLowerCase();
	var id = bs(search_key);
	if (id >= 0) {
		var res = x[id].split("#");
		var title = res[0];
		var cont = "";
		var count = 0;
		var ts = new Array();
		while (title.startWith(search_key)) {
			count++;
			ts.push(Number(res[1]));
			//var index = Number(res[1]);
			//cont += "<li>"+t[index].replace(/{/g, "<span class='small'>").replace(/}/g, "</span>")+"</li>";
			id++;
			if (id >= x.length) break;
			res = x[id].split("#");
			title = res[0];
		}
		ts.sort();
		for (var i=0; i<count; i++) {
			cont += "<li>"+t[ts[i]].replace(/{/g, "<span class='small'>").replace(/}/g, "</span>")+"</li>";
			
		}
		document.getElementById("result").innerHTML = "<div>共 "+count+" 个词条</div><ul>"+cont+"</ul>";
		//var 
	} else document.getElementById("result").innerHTML = "无结果";
	//alert(id);
}



function bs(key) {
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