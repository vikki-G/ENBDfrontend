var DEBUG = 'DEBUG';
var INFO = 'INFO';
var ERROR = 'ERROR';
var WARNING = 'WARNING';
var WIDGET_NAME = "CATEGORY"
var IS_CONSOLE_LOG_ENABLE = true;
var agentHandle = "";

$(document).ready(function () {
   loadCategoryChannelType();
   loadCategoryrowData();
});

function loadCategoryChannelType(){
    widgetTypeWriteLog(DEBUG, 'loadWidgetTypeCategoryChannelTypeData -> Web serviceStart ');
    var request=JSON.stringify({
        "serviceName" : "getChannelType",
        "requestData" : ""
    });
    var reqUrl = WidgetMiddlewareURL + "/postrequest";
    WidgetTypeExecuteWebRequest(reqUrl, "POST", request, "REQUEST_SERVICEE_WIDGET_TYPE_CATEGORY_CHANNEL_TYPE"); 
    widgetTypeWriteLog(DEBUG, 'loadWidgetTypeCategoryChannelTypeData -> Web serviceEnd ');
}
function loadCategoryrowData(){
    widgetTypeWriteLog(DEBUG, 'loadWidgetDispositionCategoryLoadData -> Web serviceStart ');
    var request=JSON.stringify({
        "serviceName" : "getCategoryDetails1",
        "requestData" : ""
    });
    var reqUrl = WidgetMiddlewareURL + "/postrequest";
    WidgetTypeExecuteWebRequest(reqUrl, "POST", request, "REQUEST_SERVICE_WIDGET_TYPE_CATEGORY_DETAILS"); 
    widgetTypeWriteLog(DEBUG, 'loadWidgetTypeCategoryChannelTypeData -> Web service End ');
}
function categoryRedirectAction(requestData,responseData) {
    widgetTypeWriteLog(INFO, + JSON.stringify(responseData));
    bindCategoryData(responseData);   
}
function bindCategoryData(responseData) {
   var configCategoryList = responseData;
    if (configCategoryList == null || configCategoryList == undefined || configCategoryList.length == 0) {
        widgetTypeWriteLog(INFO, "bindCategoryData -> Request Data is NULL or Empty");
        return
    }
    var _tbody = $('#tblCategoryList');
    _tbody.html('');
    var _html = "";
    $.each(configCategoryList, function (i, el) {
        _html += `<tr id="${el.ref_id}">`;
        _html += `<td id="CategoryName" class="wrap-text message-text" >${el.category_name}</td>`;
        _html += `<td id="CategoryDescription" class="wrap-text message-text" >${el.category_desc}</td>`;
        _html += `<td id="ChannelType" >${el.channel}</td>`;
        _html += `<td id="RemarksType" class="wrap-text message-text">${el.remarks}</td>`;
        _html += `<td id="StatusType" class="wrap-text message-text">${el.status}</td>`;
        _html += `<td> <ul class="action-btn-container"> <li> <i title="Edit" data-id="${el.ref_id}" class="fa fa-edit edit-btn"></i> </li> </ul> </td >`;
        _html += `<td> <ul class="action-btn-container"> <li> <i title="Delete" data-id="${el.ref_id}" class="fa fa-trash delete-btn"></i> </li> </ul> </td >`;
        _html += `</tr>`;

    });
    _tbody.append(_html);
    $('#tblcategory_grid').DataTable({
        destroy: true,
        iDisplayLength: 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [4, 5] }]
    });
    widgetTypeWriteLog(INFO, " bindCategoryData -> List load success");
}
function categoryLoadChannelTypeRedirectAction(requestData,response) {
    bindloadChannelType(response);   
}
function bindloadChannelType(jsonResponse) {
    widgetTypeWriteLog(DEBUG, 'bindWidgetDispositionCategoryChannelType -> Start ');
    if (jsonResponse == null || jsonResponse == undefined || jsonResponse == '') { 
         widgetTypeWriteLog(INFO, "respLoadChannelType -> Category Channel Type is NULl or Empty");
         categoryShowMessageBox("FAIL", "Load Fail", "Load Failed"); 
        return;
    }
    $.each(jsonResponse, function (i, el) {
        $('#Channel_Group').append(new Option(el.channel));
    });
    widgetTypeWriteLog(DEBUG, 'bindWidgetDispositionCategoryChannelType -> End');
}
function saveCategoryRow() {
    widgetTypeWriteLog(DEBUG, 'saveCategoryRow -> Start ');
     var _nameType=$("#Category_Name").val();
     var _descriptionType=$("#Category_Description").val();
     var _channel = $("#Channel_Group option:selected").val();
     var _remarks = $("#Remarks_Type").val();
     var _status = $("#Status_Type").val();
    CategoryRemoveRequired();
     if (categoryValidateRequired("add") == false) {
         return false;
     }
     var reqDataJson =JSON.stringify({
        "ref_id": getGuid(),
        "channel":  _channel,
        "category_name":_nameType,
        "category_desc": _descriptionType,
        "status":_status,
        "remarks":_remarks
     });
     var reqjson = JSON.stringify({
         "serviceName" : "addCategory",
         "requestData" : reqDataJson
     });
     var reqUrl = WidgetMiddlewareURL + "/postrequest";
     WidgetTypeExecuteWebRequest(reqUrl, "POST",reqjson,"REQUEST_SERVICE_WIDGET_TYPE_CHANNEL_SAVE"); 
     widgetTypeWriteLog(DEBUG, 'saveCategoryRow -> End ');
    }
 function CategoryRemoveRequired(){
    $("#Category_Name").removeClass("required");
    $("#Category_Description").removeClass("required");
    $("#Channel_Group").removeClass("required");
    $("#Remarks_Type").removeClass("required");
    $("#Status_Type").removeClass("required");
}

function categoryValidateRequired(option) {
    var _nameType=$("#Category_Name").val();
    var _descriptionType=$("#Category_Description").val();
    var _channel = $("#Channel_Group option:selected").val();
    var _remarks = $("#Remarks_Type").val();
    var _status = $("#Status_Type").val();

    if (_nameType == "") {
        $("#Category_Name").addClass("required");
        widgetTypeWriteLog(WARNING, `updateCategory ->  Select Category Name`);
        return false;
    }
    if (_descriptionType == "") {
        widgetTypeWriteLog(WARNING, `updateCategory->  Select Category Description  `);
        $("#Category_Description").addClass("required");
        return false;
    }
    if ( _channel == "") {
        widgetTypeWriteLog(WARNING, `updateCategory  ->  Select Channel `);
        $("#Channel_Group").addClass("required");
        return false;
    }
    if (_remarks == "") {
        widgetTypeWriteLog(WARNING, `updateCategory  ->  Select remarks `);
        $("#Remarks_Type").addClass("required");
        return false;
    }
    if ( _status == "") {
        widgetTypeWriteLog(WARNING, `updateCategory  ->  Select status`);
        $("#Status_Type").addClass("required");
        return false;
    }
    if (option == "add") {
        if (checkCategoryValueExist(_nameType,_descriptionType, _channel,_remarks,_status)) {
           widgetTypeShowMessageBox("WARNING", "Already exists", "already exists ");
           widgetTypeWriteLog(WARNING, `serviceValidateRequired ->   already exists  `);
            return false;
        }
    }
    return true;
}
function checkCategoryValueExist(category_nameType,category_descriptionType, channel_type,remarks_type,status_type) {
    var return_value = false;
    $('#tblCategoryList > tr').each(function (index, tr) {
        var categoryName=tr.getElementsByTagName('td').CategoryName.innerHTML.trim();
        var categoryDescription = tr.getElementsByTagName('td').CategoryDescription.innerHTML.trim();
        var channel = tr.getElementsByTagName('td').ChannelType.innerHTML;
        var remarks = tr.getElementsByTagName('td').RemarksType.innerHTML.trim();
        var status = tr.getElementsByTagName('td').StatusType.innerHTML.trim();
        if (category_nameType ==  categoryName && category_descriptionType == categoryDescription && channel_type == channel && remarks_type == remarks && status_type ==status ) {
            return_value = true;
        }
    });
    return return_value;
}
function SaveCategoryData (requestData, jsonResponse) {
    // if (jsonResponse == null || jsonResponse == undefined || jsonResponse == '') {
    //     widgetTypeShowMessageBox("SUCCESS", "Created Fail", "Failed to create new one")
    //     widgetTypeWriteLog(INFO, "respSaveCategoryData ->  List is NULl or Empty");
    //     return;
    // }
    CategoryaddNewRow(JSON.parse(requestData));
    $('.popup-body-container').addClass("hide");
  
    widgetTypeWriteLog(INFO, "respSaveCategoryData -> Show Status Popup- " + JSON.stringify(jsonResponse));
    widgetTypeShowMessageBox("SUCCESS", "Created Success"," Category created successfully")
}
function CategoryaddNewRow(Data) {
    widgetTypeWriteLog(INFO, "CategoryaddNewRow -> Add new row on success");
    var _tbody = $('#tblCategoryList');
    const obj= DataTypeConvertion(Data);
     var _html = "";     
       _html += `<tr id="${obj.ref_id}">`;
       _html += `<td id="CategoryName" class="wrap-text message-text" >${obj.category_name}</td>`;
       _html += `<td id="CategoryDescription" class="wrap-text message-text" >${obj.category_desc}</td>`;
       _html += `<td id="ChannelType"  class="wrap-text message-text">${obj.channel}</td>`;
       _html += `<td id="RemarksType" class="wrap-text message-text">${obj.remarks}</td>`;
       _html += `<td id="StatusType" class="wrap-text message-text">${obj.status}</td>`;
       _html += `<td> <ul class="action-btn-container"> <li> <i title="Edit" data-id="${obj.ref_id}" class="fa fa-edit edit-btn"></i> </li> </ul> </td >`;
       _html += `<td> <ul class="action-btn-container"> <li> <i title="Delete" data-id="${obj.ref_id}" class="fa fa-trash delete-btn"></i> </li> </ul> </td >`;
       _html += `</tr>`;
    _tbody.append(_html);
     var table = $('#tblcategory_grid').DataTable();
     table.row.add($(_html)).draw().node();
     var index = table.row(0).index(),
         rowCount = table.data().length - 1,
         insertedRow = table.row(rowCount).data(),
         tempRow;
     console.log(index);
 
     for (var i = rowCount; i > index; i--) {
         tempRow = table.row(i - 1).data();
         table.row(i).data(tempRow);
         table.row(i - 1).data(insertedRow);
     }  
     //DataTable
     $('#tblcategory_grid').DataTable({
        destroy: true,
        iDisplayLength: 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [4, 5] }]
    });
   //DataTable
 }
 function deleterowCategoryTable(id, text,name) {
    $('.popup-body-container#deleteCategoryRowConfirmation_Pop').removeClass("hide");
    $('.popup-body-container#deleteCategoryRowConfirmation_Pop .category-popup-header').addClass("category-delete-popheader");
    $('.popup-body-container#deleteCategoryRowConfirmation_Pop .message-category-popup-head').text('Delete Category Name?');
    $('.popup-body-container#deleteCategoryRowConfirmation_Pop .message-category-popup-text').html("<strong>" + text + "</strong>");
    $("#hdnDeleteCategorytableID").val(id);
    $("#hdnDeleteValidateCategoryNameID").val(text);
}
/*
function deleteConfirmCategoryTable() {
    widgetTypeWriteLog(DEBUG, 'deleteConfirmCategoryTable -> Start ');
    var requestdata = JSON.stringify({
    "CATEGORY_NAME": $("#hdnDeleteValidateCategoryNameID").val(), 
    });
    var reqjson = JSON.stringify({
        "serviceName" : "deleteValidateCategory",
        "requestData" : requestdata
    });
    var reqUrl = WidgetMiddlewareURL + "/postrequest";
    WidgetTypeExecuteWebRequest(reqUrl, "POST",reqjson,"REQUEST_SERVICE_TYPE_WIDGET_CATEGORY_DELETE_VALIDATE_ROW");
 }
 */
 function deleteConfirmCategoryTable(){
   // if(Array.isArray(requestData) && requestData.length){
       //widgetTypeWriteLog(WARNING, `Can't delete category its depents on Another table `);
       // widgetTypeShowMessageBox("WARNING", "NO DELETE OPERATION  , Another table has Value Access", requestData[0].subcategory_categoryName +" Category present in subcategory & Reason list");
   // }else{
        widgetTypeWriteLog(DEBUG, 'deleteConfirmCategoryTable -> Start ');
    var requestdata = JSON.stringify({
         "ref_id": $("#hdnDeleteCategorytableID").val()
     });
    var reqjson = JSON.stringify({
         "serviceName" : "deleteCategory",
         "requestData" : requestdata
     });    
    var reqUrl = WidgetMiddlewareURL + "/postrequest";
     WidgetTypeExecuteWebRequest(reqUrl, "POST",reqjson,"REQUEST_SERVICE_TYPE_WIDGET_CATEGORY_DELETE_ROW"); 
    //}
 }
 function DeletecategoryRedirectAction(response,requestData) {
    widgetTypeWriteLog(INFO, 'categoryDeleteRedirectAction  --> Web service execute success, Response : ' + JSON.stringify(response));
    DeleteCategoryData(requestData, response);
}
function DeleteCategoryData(requestData, jsonResponse) {
    var _ref_id = requestData.ref_id;
    if (jsonResponse == null || jsonResponse == undefined || jsonResponse == '') {
        widgetTypeWriteLog(INFO, "DeleteCategoryData ->  List is NULl or Empty");
        widgetTypeShowMessageBox("DELETE", "Delete Fail", "Failed to delete the category data")
        return;
    }
    var table = $('#tblcategory_grid').DataTable();
    table.row($('#tblcategory_grid #' + _ref_id)).remove().draw(false);
    widgetTypeWriteLog(INFO, "DeleteCategoryData -> Show Status Popup- " + JSON.stringify(jsonResponse));
    widgetTypeShowMessageBox("DELETE", "Delete Success", "Category row deleted successfully")
}
function updateCategoryData(){
    widgetTypeWriteLog(DEBUG, 'UpdateWidgetCategoryrowData -> Web serviceStart ');
    var categoryName = $("#Category_Name").val();
    var categoryDesc = $("#Category_Description").val();
    var channelgroupName = $("#Channel_Group").val();
    var remarks = $("#Remarks_Type").val();
    var status = $("#Status_Type").val();
    var _id = $("#hdnCategoryID").val();
    CategoryRemoveRequired();
     if (categoryValidateRequired("add") == false) {
         return false;
     }
     var reqDataJson =JSON.stringify({
        "ref_id":_id ,
        "channel":  channelgroupName,
        "category_name":categoryName,
        "category_desc": categoryDesc,
        "status":status,
        "remarks":remarks
     });
        var reqjson = JSON.stringify({
            "serviceName" : "updateCategory",
            "requestData" : reqDataJson
    });

    var reqUrl = WidgetMiddlewareURL + "/postrequest";
    WidgetTypeExecuteWebRequest(reqUrl, "POST", reqjson, "REQUEST_SERVICEE_WIDGET_TYPE_CATEGORY_ROW_UPDATE"); 
    widgetTypeWriteLog(DEBUG, 'UpdateWidgetCategoryrowData -> Web serviceEnd ');
}
function UpdatecategoryrowRedirection(requestData,jsonResponse){
    var _requestData = JSON.parse(requestData);
    if (jsonResponse == null || jsonResponse == undefined || jsonResponse == '') {
        widgetTypeWriteLog(INFO, "UpdateCategoryData ->  List is NULl or Empty");
        widgetTypeShowMessageBox("FAIL", "Update Fail", "Failed to update ");
        return;
    }
    $('.popup-body-container').addClass("hide");
    CategoryrowUpdateHtmlTableRow(_requestData);
    $("#cannedId").val("");
    widgetTypeWriteLog(INFO, "UpdateCategoryData -> Show Status Popup- " + JSON.stringify(jsonResponse));
    widgetTypeShowMessageBox("SUCCESS", "Update Success", " Category updated successfully")
}
function CategoryrowUpdateHtmlTableRow(Data){
    const requestData= DataTypeConvertion(Data);
    $("#" + requestData.ref_id + " #CategoryName").text(requestData.category_name);
    $("#" + requestData.ref_id + " #CategoryDescription").text(requestData.category_desc);
    $("#" + requestData.ref_id + " #ChannelType").text(requestData.channel);
    $("#" + requestData.ref_id + " #RemarksType").text(requestData.remarks);
    $("#" + requestData.ref_id + " #StatusType").text(requestData.status);
    $('#tblcategory_grid').DataTable({
        destroy: true,
        iDisplayLength: 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [4, 5] }]
    });
}
