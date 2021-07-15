var OpsGenie_Client = Class.create();

OpsGenie_Client.prototype = {
    initialize: function() {
		this.apiKey = gs.getProperty('x_86994_opsgenie.api.key', '');
		this.endpoint = gs.getProperty('x_86994_opsgenie.api.url', 'https://api.opsgenie.com');
		this.useAcknowledgeInsteadOfAssign = gs.getProperty('x_86994_opsgenie.use.acknowledge', false) === 'true' ? true : false;
		this.syncUsersAndGroupsWithOpsGenie = gs.getProperty('x_86994_opsgenie.use.sync', false) === 'true' ? true : false;
    },
	
	postToOpsGenie: function(contentMap) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Webhook', 'post');
			rest.setQueryParameter("apiKey", this.apiKey);
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setRequestHeader("Content-Type", "application/json");
			var content = new global.JSON().encode(contentMap);
		
			rest.setRequestBody(content);

			gs.debug("Posting to " + rest.getEndpoint() + " content: " + content);
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();

			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")){
				gs.error(responseLogMessage);
			} else{
				gs.debug(responseLogMessage);
			}
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	postToOpsGenieAlertAPI: function(contentMap, subEndpoint, identifierType) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Alert API Endpoint', 'post');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			
			if(identifierType !== ""){
				rest.setQueryParameter("identifierType", identifierType);
			}
			
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", subEndpoint);
			rest.setRequestHeader("Content-Type", "application/json");
			
			var content = new global.JSON().encode(contentMap);
			rest.setRequestBody(content);

			gs.debug("Posting to " + rest.getEndpoint() + " content: " + content);
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();

			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")){
				gs.error(responseLogMessage);
			} else{
				gs.debug(responseLogMessage);
			}
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	postToOpsGenieUserAPI: function(contentMap, subEndpoint) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie User API Endpoint', 'post');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", subEndpoint);
			rest.setRequestHeader("Content-Type", "application/json");
			
			var content = new global.JSON().encode(contentMap);
			rest.setRequestBody(content);

			gs.debug("Posting to " + rest.getEndpoint() + " content: " + content);
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();

			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")){
				gs.error(responseLogMessage);
			} else{
				gs.debug(responseLogMessage);
			}
			
			return response;
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("[OpsGenie_Client] Exception occured: ", ex);
		}
	},
	
	patchToOpsGenieUserAPI: function(contentMap, subEndpoint) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie User API Endpoint', 'patch');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", subEndpoint);
			rest.setRequestHeader("Content-Type", "application/json");
			
			var content = new global.JSON().encode(contentMap);
			rest.setRequestBody(content);

			gs.debug("Posting to " + rest.getEndpoint() + " content: " + content);
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();

			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")){
				gs.error(responseLogMessage);
			} else{
				gs.debug(responseLogMessage);
			}
			
			return response;
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("[OpsGenie_Client] Exception occured: ", ex);
		}
	},
	
	postToOpsGenieTeamAPI: function(contentMap, subEndpoint, teamIdentifierType) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Team API Endpoint', 'post');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			
			if(teamIdentifierType !== ""){
				rest.setQueryParameter("teamIdentifierType", teamIdentifierType);				
			}
			
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", subEndpoint);
			rest.setRequestHeader("Content-Type", "application/json");
			
			var content = new global.JSON().encode(contentMap);
			rest.setRequestBody(content);

			gs.debug("Posting to " + rest.getEndpoint() + " content: " + content);
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();

			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")){
				gs.error(responseLogMessage);
			} else{
				gs.debug(responseLogMessage);
			}
			
			return response;
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	deleteUserFromOpsGenie: function(subEndPoint) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie User API Endpoint', 'delete');
            rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", subEndPoint);
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);

			gs.debug("Sending delete request to " + rest.getEndpoint());
			rest.executeAsync();
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	deleteTeamFromOpsGenie: function(subEndPoint, identifierType) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Team API Endpoint', 'delete');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
            rest.setStringParameter("endPoint", this.endpoint);
			
			if(identifierType !== ""){
				rest.setQueryParameter("identifierType", identifierType);
			}
			
			rest.setStringParameter("subEndPoint", subEndPoint);

			gs.debug("Sending delete request to " + rest.getEndpoint());
			rest.executeAsync();
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	deleteTeamMemberFromTeamInOpsGenie: function(teamName, userId, identifierType) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Team API Endpoint', 'delete');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
            rest.setStringParameter("endPoint", this.endpoint);
			
			if(identifierType !== ""){
				rest.setQueryParameter("teamIdentifierType", identifierType);
			}
			
			var formedSubEndPoint = "/" + teamName + "/members/" + userId;
			rest.setStringParameter("subEndPoint", formedSubEndPoint);

			gs.debug("Sending delete request to " + rest.getEndpoint());
			rest.executeAsync();
		}
		catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occured: ", ex);
		}
	},
	
	formatPhoneNumber: function(number) {
		number = number
			.replace(/\(/g, "")
			.replace(/\)/g, "")
			.replace(/\-/g, "")
			.replace(/\//g, "")
			.replace(/\+/g, "")
			.replace(/\ /g, "");
		
		if (number.length > 10) {
			number = number.substring(0, number.length - 10) + "-" + number.substring(number.length - 10, number.length);
		} else {
			number = "1-" + number;
		}
		
		return number;
	},
	
	replaceForbiddenCharacters: function(teamName) {
		teamName = teamName.replace(/[^0-9a-zA-Z]+/g, "_");
		return teamName;
	},
	
	postToWebService: function(webServiceName, body) {
		var requestUrl = gs.getProperty('glide.servlet.uri') + "api/now/import/" + webServiceName;
		
		var bodyJSON = new global.JSON().encode(body);
		gs.info("[OpsGenie_Client-postToWebService] Making request to " + requestUrl + " with content: " + bodyJSON);

		var webServiceRequest = new sn_ws.RESTMessageV2();
		webServiceRequest.setEndpoint(requestUrl);
		webServiceRequest.setHttpMethod('POST');
		webServiceRequest.setRequestHeader("Accept","application/json");
		webServiceRequest.setRequestHeader('Content-Type','application/json');
		webServiceRequest.setRequestBody(bodyJSON);

		return webServiceRequest.execute();
	},
	
	queryEntity: function(tableName, queryFieldName, queryValue) {
		var entity = new GlideRecord(tableName);
		entity.addQuery(queryFieldName, queryValue);
		entity.query();
		
		if (entity.next()) {
			return entity;
		} else {
			return undefined;
		}
	},
	
	getAlertFromOpsGenie: function(alias) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Alert API Endpoint', 'get');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", "/" + alias + "?identifierType=alias");
			rest.setRequestHeader("Content-Type", "application/json");
			
			gs.debug("Sending GetAlert request to " + rest.getEndpoint());
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();
			
			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")) {
				gs.error(responseLogMessage);
				return "";
			} else {
				gs.debug(responseLogMessage);
				return responseBody;
			}
		} catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occurred: ", ex);
		}
	},

	getServiceFromOpsGenie: function(serviceId) {
		try {
			var rest = new sn_ws.RESTMessageV2('x_86994_opsgenie.OpsGenie Alert API Endpoint', 'get');
			rest.setRequestHeader("Authorization", "GenieKey " + this.apiKey);
			rest.setStringParameter("endPoint", this.endpoint);
			rest.setStringParameter("subEndPoint", "/v1/services/" + serviceId);
			rest.setRequestHeader("Content-Type", "application/json");
			
			gs.debug("Sending GetService request to " + rest.getEndpoint());
			var response = rest.execute();
			var responseBody = response.getBody();
			var httpStatus = response.getStatusCode();
			
			var responseLogMessage = "Response status: " + httpStatus + ", body: " + responseBody;
			
			if(!httpStatus.toString().startsWith("2")) {
				gs.error(responseLogMessage);
				return "";
			} else {
				gs.debug(responseLogMessage);
				return responseBody;
			}
		} catch(ex) {
			var message = ex.getMessage();
			gs.error("Exception occurred: ", ex);
		}
	},
	
    type: 'OpsGenie_Client'
};
