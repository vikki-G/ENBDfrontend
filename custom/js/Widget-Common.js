function WidgetTypeExecuteWebRequest(requestUrl, httpMethodType, requestData, serviceType) {
    widgetTypeWriteLog(INFO, 'WidgetExecuteWebRequest -> Start. Service type is  - ' + serviceType + ' HTTP method type - ' + httpMethodType + '. webservice URL  ' + requestUrl + 'Request Data - ' + JSON.stringify(requestData));
    if (requestUrl == "" && httpMethodType == "") {
        widgetTypeWriteLog(INFO, 'WidgetExecuteWebRequest ->  webservice Request data Is Null or Empty ');
        return;
    }
  
    $.ajax({
        url: requestUrl,
        type: httpMethodType,
        data: requestData,
        cache: false,
        contentType: false,
        processData: false,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (response) {
			var _jsonData = response;
            WidgetTypeRedirectAction(_jsonData,serviceType, requestData);
		},
		failure: function () {
			CategoryWriteLog(Error, "loadWidgetDispositionCategory - Failed");
		}
    });
}

function WidgetTypeRedirectAction(response, serviceType, requestData) {
    widgetTypeWriteLog(INFO, 'WidgetTypeRedirectAction -> ' + serviceType + ' --> Web service execute success, Response : ' + JSON.stringify(response));
    if (serviceType == "REQUEST_SERVICE_WIDGET_TYPE_CATEGORY_DETAILS")
        categoryRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_CATEGORY_CHANNEL_TYPE")
        categoryLoadChannelTypeRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICE_WIDGET_TYPE_CHANNEL_SAVE")
        SaveCategoryData(requestData, response);
    else if (serviceType == "REQUEST_SERVICE_TYPE_WIDGET_CATEGORY_DELETE_ROW")
        DeletecategoryRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_CATEGORY_ROW_UPDATE")
         UpdatecategoryrowRedirection(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_TYPE_WIDGET_CATEGORY_DELETE_VALIDATE_ROW")
        ValidatecategoryrowDeletion(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_TYPE_WIDGET_SUBCATEGORY_DETAILS")
        subcategoryRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_SUBCATEGORY_CATEGORY_NAME")
         SubcategoryLoadCategoryRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_SUBCATEGORY_SAVE")
         SaveSubCategoryData(requestData, response);    
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_SUBCATEGORY_DELETE_ROW")
         DeleteSubcategoryRedirectAction(requestData, response);  
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_SUBCATEGORY_ROW_UPDATE")
          UpdateSubcategoryrowRedirection(requestData, response);             
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_SUBCATEGORY_VALIDATE_ROW")
         ValidateSubcategoryrowDeletion(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_WIDGET_TYPE_REASONCODE_DETAILS")
         reasoncodeRedirectAction(requestData, response);  
    else if (serviceType == "REQUEST_SERVICE_WIDGET_TYPE_REASONCODE_SUBCATEGORY_NAME")
         reasoncodeSubcategoryRedirectAction(requestData, response);    
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_REASONCODE_SAVE")
         SaveReasoncodeData(requestData, response);    
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_REASONCODE_DELETE_ROW")
         DeleteReasoncodeData(requestData, response);   
    else if (serviceType == "REQUEST_SERVICEE_WIDGET_TYPE_REASONCODE_ROW_UPDATE")
         UpdateReasoncoderowRedirection(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_KEYWORDCONFIG_DETAILS")
         EmailkeywordconfigRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_KEYWORDCONFIG_UPDATE")
         UpdateEmailkeywordconfig(requestData, response);  
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_KEYWORDCONFIG_SAVE")
        SaveEmailkeywordconfig(requestData, response);  
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_KEYWORDCONFIG_VALIDATE_ROW")
        ValidateKeywordConfigrowDeletion(requestData, response);     
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_KEYWORDCONFIG_DELETE_ROW")
        DeleteKeywordconfigData(requestData, response);    
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PRIORITY_CONFIG_DETAILS")
         EmailPriorityconfigRedirectAction(requestData, response);
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PRIORITY_CONFIG_MAILBOX")
    EmailPriorityconfigMailboxPortal(requestData, response);    
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PRIORITY_CONFIG_GROUPNAME")
         EmailPriorityconfigGroupName(requestData, response);  
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PRIORITY_CONFIG_SAVE")
         SaveEmailPriorityconfigData(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PRIORITY_CONFIG_UPDATE")
         UpdateEmailPriorityconfig(requestData, response);   
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_PRIORITY_CONFIG_DELETE_ROW")
         DeleteEmailPriorityconfigData(requestData, response);  
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_BLACKLIST_DETAILS")
         EmailBlacklistAddressRedirectAction(requestData, response);  
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_BLACKLIST_SAVE")
         SaveEmailBlacklistAddressData(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_BLACKLIST_DELETE_ROW")
         DeleteEmailBlacklistAddressData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_BLACKLIST_UPDATE")
         UpdateEmailBlacklistAddressData(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PORTAL_ADDRESS_DETAILS")
        EmailPortalAddressRedirectAction(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PORTAL_ADDRESS_MAILBOX_PORTAL")
        MailboxLoadPortalDrapdownboxData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PORTAL_ADDRESS_DELETE_ROW")
        DeleteEmailPortalAddressData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PORTAL_ADDRESS_SAVE")
        SaveEmailPortalAddressData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_PORTAL_ADDRESS_UPDATE")
        UpdateEmailPortalAddressData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_TEMPLATE_MASTER_DETAILS")
        EmailTemplateMasterRedirectAction(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_TEMPLATE_MASTER_UPDATE")
        UpdateEmailTemplateMaster(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_TEMPLATE_MASTER_SAVE")
        SaveEmailTemplateMasterData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_TEMPLATE_VALIDATE_ROW")
        ValidateTemplaterowDeletion(requestData, response); 
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_TEMPLATE_DELETE_ROW")
        DeleteTemplaterowDeletion(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_REPLAY_MAILBOX_DETAILS")
        EmailReplayMailboxRedirectAction(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_REPLAY_MAILBOX_SAVE")
        SaveEmailReplayMailboxMasterData(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_REPLAY_MAILBOX_VALIDATE_ROW")
        ValidatemailboxrowDeletion(requestData, response);    
    else if (serviceType == "REQUEST_SERVICEE_EMAIL_TYPE_REPLAY_MAILBOX_DELETE_ROW")
       DeleteEmailReplayMailboxMasterData(requestData, response);    
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_REPLAY_MAILBOX_UPDATE")
         UpdateEmailreplaymailboxrow(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_DETAILS")
        OCEmailMailboxConfigRedirectAction(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_SAVE")
        SaveOCEmailMailboxConfigData(requestData, response); 
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_UPDATE")
        UpdateOCEmailMailboxConfigData(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_TEMPLATE_ID")
         OCEmailMailboxConfigTemplateID(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_MAILBOX_ID")
         OCEmailMailboxConfigMailboxID(requestData, response);     
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_DELETE")
         DeleteOCEmailMailboxConfig(requestData, response);   
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_VALIDATE_ROW")
         ValidateOcMailConfigrowDeletion(requestData, response);
    else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_KEYWORD_BLACKLIST_GROUP_ID")
       OCEmailMailboxConfigBlacklistGroupID(requestData, response);  
     else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_KEYWORD_GROUP_ID")
        OCEmailMailboxConfigKeywordGroupID(requestData, response); 
       else if (serviceType == "REQUEST_SERVICE_EMAIL_TYPE_OC_MAILBOXCONFIG_DEF_TEMPLATE_ID")
       OCEmailMailboxConfigDefEmailTempID(requestData, response); 

}
function widgetTypeShowMessageBox(status, header, messge) {
    if (status == "DELETE") {
        $('.popup-body-container#message_Pop .popup-header').removeClass("add-popheader")
        $('.popup-body-container#message_Pop .popup-header').addClass("delete-popheader")
    } else {
        $('.popup-body-container#message_Pop .popup-header').removeClass("delete-popheader")
        $('.popup-body-container#message_Pop .popup-header').addClass("add-popheader")
    }
    $("#hdnMessagePopupStatus").val(status);
    $('.popup-body-container#message_Pop').removeClass("hide");
    $('.popup-body-container#message_Pop .message-popup-head').text(header);
    $('.popup-body-container#message_Pop .message-popup-text').html(`<span style='color: ${status == "DELETE" ? "#e14343" : "#00925b"}'> ${messge}</span>`);
}
function widgetTypeWriteLog(type, msg) {
    if (IS_CONSOLE_LOG_ENABLE == false)
        return;

    var log = WIDGET_NAME + " --> " + type + " --> " + get_time() + " --> ";

    if (type == INFO) {
        console.log("%c" + log, "color:Green;font-weight: bold", msg, "");
    }

    else if (type == DEBUG) {
        console.log("%c" + log, "color:DodgerBlue;font-weight: bold", msg, "");
    }

    else if (type == ERROR) {
        console.log("%c" + log, "color:Red;font-weight: bold", msg, "");
    }

    else if (type == WARNING) {
        console.log("%c" + log, "color:Orange;font-weight: bold", msg, "");
    }
}
// Create  popup closing section And declared here
function messagePopClose() {
    if ($("#hdnPopupStatus").val() == "WARNING") {
        $("#message_Pop").addClass('hide');
    }
    else {
        $("#message_Pop").addClass('hide');
        $("#addeditCategoryData_Pop").addClass('hide');

    }
}

function get_time() {
    var currentdate = new Date();
    return currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
}

function getTime_yyyymmdd() {
    var currentdate = new Date();
    return currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
}
function getGuid(t) {
    function _p8() {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return t ? "_" + p.substr(0, 4) + "_" + p.substr(4, 4) : p;
    }
    var g = _p8() + _p8(true) + _p8(true) + _p8();
    //return t == '' ? g : t + "_" + g;
    return t == '' ? g : g;
}
function DataTypeConvertion(Data) {
    const  text =Data.requestData;
    const obj = JSON.parse(text);
    return obj;
}