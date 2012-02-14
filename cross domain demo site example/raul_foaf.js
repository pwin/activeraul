var dataInstanceURI = "http://w3c.org.au/raul/service/public/forms/foafedit/ArminHaller";

jQuery(document).ready(
        function(){
                initRaulFrontEnd();
        }
);

function foaficon_click(){
	jQuery.ajax({
		type: "POST",
		url: "cross_domain_proxy.php",
		data: { 
			'type': "html",
			'url': dataInstanceURI,
			'method': "get"
		},
		cache: false,
		success: function(data, textStatus, xhr){
					document.getElementById('content_left').innerHTML = 
					createLink(dataInstanceURI) + data;
				}
	});	
}

function createLink(targetURI){
        return "<a href=\"#\" onclick=\"getDataRDF('" +
                        targetURI + "');return false;\">" + targetURI +
                        "</a><br/>";
}

function getDataRDF(targetURI){
	jQuery.ajax({
		type: "POST",
		url: "cross_domain_proxy.php",
		data: { 
			'type': "rdf",
			'url': dataInstanceURI,
			'method': "get"
		},
		cache: false,
		success: function(data, textStatus, xhr){
					var newWindow = window.open(showXML(data));
				}
	});
}

function submitDataWrap(){
    var rdf = parseDom("content_left");
    var rdfString = rdf.databank.dump({format:'application/rdf+xml', serialize: true});

    if(agentName == "ChromeSafari"){
        var regex=/raul:subject xmlns:raul=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"/g;
        rdfString = rdfString.replace(regex, "rdf:subject");
        regex=/raul:predicate xmlns:raul=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"/g;
        rdfString = rdfString.replace(regex, "rdf:predicate");
        regex=/raul:object xmlns:raul=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"/g;
        rdfString = rdfString.replace(regex, "rdf:object");
        regex=/xmlns:raul=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"/g;
        rdfString = rdfString.replace(regex, "");
        regex=/raul:_/g;
        rdfString = rdfString.replace(regex, "rdf:_");
        regex=/raul:subject/g;
        rdfString = rdfString.replace(regex, "rdf:subject");
        regex=/raul:predicate/g;
        rdfString = rdfString.replace(regex, "rdf:predicate");
        regex=/raul:object/g;
        rdfString = rdfString.replace(regex, "rdf:object");
    }
	
    jQuery.ajax({
        type: "POST",
        url: "cross_domain_proxy.php",
        data: { 
			'payload': rdfString,
			'url': dataInstanceURI,
			'method': "put"
		},
        cache: false,
        success: function(data, textStatus, xhr){
                     document.getElementById('content_left').innerHTML = data;
                 }
     });
}

