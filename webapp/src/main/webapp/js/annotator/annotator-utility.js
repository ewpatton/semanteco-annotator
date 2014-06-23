document.addEventListener("load", loadTables());
document.addEventListener("load", initGlobals());
document.addEventListener("beforeunload", saveSDV());

// for arrays, need localStorage.setItem("thing", JSON.stringify(thing)); to save
// JSON.parse(sessionStorage.getItem("thing")); to load

// html/string
function loadTables() {
	console.log("loadTable() called");
	if (typeof(Storage)== "undefined" ){
		alert("Your browser does not support HTML5 sessionStorage. You will lose your work if you refresh the page.");
	}
	if (sessionStorage.table && sessionStorage.rdfa) {	
		console.log("loading DOM from sessionStorage....");
		window.hasTable = 1;
		$('#list').append(sessionStorage.table);
		$('#list').removeClass("hidden");
		$('#e_process').append(sessionStorage.rdfa);
	}
}
// array
function initCellBased(){
	if (sessionStorage.cellBasedCols) {	
		console.log("-- loading cellBased from sessionStorage");
		cellBased = JSON.parse(sessionStorage.getItem("cellBasedCols"));
	}
	else{
		console.log("-- creating cellBased");
		cellBased = [];
	}
}

// array(?)
function initDlHist(){
	if(sessionStorage.dlHist){
		console.log("-- loading downloadHistory from sessionStorage");
		downloadHistory = JSON.parse(sessionStorage.getItem("dlHist"));
	}
	else{
		console.log("-- creating downloadHistory");
		downloadHistory = [];
	}
}

// array
function initCustOnotologies(){
	if(sessionStorage.custOntologies){
		console.log("-- loading customUserOntologies from sessionStorage");
		customUserOntologies = JSON.parse(sessionStorage.getItem("custOntologies"));
	}
	else{
		console.log("-- creating customUserOntologies array");
		customUserOntologies = [];
	}
}

// object
//  bundleIds
//	implicitIds
//	curBundleId
//	curImplicitId
function initIDManager(){
	if(sessionStorage.bIDmanager){
		console.log("-- loading bundleIDManager from sessionStorage");
		bundleIdManager = sessionStorage.getItem("bIDmanager");
	}
	else{
		console.log("-- creating bundleIDManager");
		bundleIdManager = new BundleIdManager();
	}
}

// array
function initBundleArray(){
	if(sessionStorage.bundles){
		console.log("-- loading bundles from sessionStorage");
		bundles = JSON.parse(sessionStorage.getItem("bundles"));
	}
	else{
		console.log("-- creating bundles array");
		bundles = [];
	}
}

// number
function initAnnotationID(){
	if(sessionStorage.aID){
		console.log("-- loading annotationID from sessionStorage");
		annotationID = sessionStorage.getItem("aID");
	}
	else{
		console.log("-- creating annotationID");
		annotationID = 0;
	}
}

// object
function initSDVHolder(){
	if(sessionStorage.sdv){
		sdvHolder = {};
		console.log("-- loading sdvHolder from sessionStorage");
		var holder = JSON.parse(sessionStorage.getItem("sdv"));
		sdvHolder.source = holder.source;
		sdvHolder.dataset = holder.dataset;
		sdvHolder.version = holder.version;
	}
	else{
		sdvHolder = {};
		console.log("-- creating sdvHolder");
	}
}

function saveSDV(){
	var source, dataset, version;
	// if the user specified a source, use that...
	if ( $("source_add_new").value ){
		source = $("source_add_new").value.replace(/\W+/g,'');
	}
	// ... otherwise, check the dropdown... 
	else if( $("source_info").value ) {
		source = $("source_info").value;
	}
	// ... and let the user know if everything's null
	if ( $("datsaset_add_new").value ){
		dataset = $("dataset_add_new").value.replace(/\W+/g,'');
	}
	// ... otherwise, check the dropdown... 
	else if( $("dataset_info").value ) {
		dataset = $("dataset_info").value;
	}
	if ( $("version_info").value ) {
		version += $("version_info").value;
		version = version.replace(/\W+/g,'');
	}
	console.log("Saving SDV: " + source + " " + dataset + " " + version);
	sdvHolder.source = source;
	sdvHolder.dataset = dataset;
	sdvHolder.version = version;
	sessionStorage.setItem("sdv", JSON.stringify(sdvHolder));
}// /saveSDV