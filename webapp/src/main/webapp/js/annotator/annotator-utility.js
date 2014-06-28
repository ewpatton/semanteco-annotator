document.addEventListener("load", loadTables());
document.addEventListener("load", initGlobals());

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
		$("#source_info").val(sdvHolder.source);
		sdvHolder.dataset = holder.dataset;
		$("#dataset_info").val(sdvHolder.dataset);
		sdvHolder.version = holder.version;
		$("#version_info").val(sdvHolder.version);
		console.log("-- SDV: " + sdvHolder.source + ", " + sdvHolder.dataset + ", " + sdvHolder.version);
	}
	else{
		sdvHolder = {};
		console.log("-- creating sdvHolder");
	}
}

// updates the source, dataset, and version info:
$("#data_info_form").on("change", "form", function( event ){
	var which = event.target.id.split("_")[0];
	console.log(which);
	if( which == "source" ){
		console.log("updating source");
		sdvHolder.source = event.target.value;
	}
	else if( which == "dataset" ){
		console.log("updating dataset");		
		sdvHolder.dataset = event.target.value;
	}
	else if( which == "version" ){
		console.log("updating version");
		sdvHolder.version = event.target.value;
	}
	else console.log("idek: " + event.target.id);
	
	console.log("saving to sessionStorage");
	sessionStorage.setItem("sdv", JSON.stringify(sdvHolder));
});