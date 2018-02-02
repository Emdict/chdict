function search() {
	//alert("search");
	search_key = document.getElementById("search").value.toLowerCase();
	var res = bs(search_key);
	if (res == 0) res = 1;
	window.location.href = "search/"+res+".html?q="+search_key;
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
