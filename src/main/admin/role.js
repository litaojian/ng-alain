
// $(function() {

//     // $("#rolename").on("change", function(e){
//     //     console.log("rolename change event:" + JSON.stringify(e.type));
//     // });

// })


function changeInput() {
    //alert(1);
    console.log("aaa=" + $("#rolename").val());
    //$("#rolename").focus();    
    $("#rolename").val("产品助理");    
    //$("#link2").trigger($.Event("click"));

    //$("#rolename").blur();
    //$("#rolename").change();
    
    // var e = jQuery.Event("input");
    // e.data = "6";
    // e.inputType="insertText";
    // console.log("event:" + JSON.stringify(e));
    // var r = $("#rolename").trigger(e);
    // // console.log(r);

    // //var e1 = jQuery.Event("select");
    // //$("#rolename").trigger(e1);
    // //$("#rolename").blur();
   
    //var e1 = jQuery.Event("click");
    //$("#addBtn").trigger(e1);
    //$("#rolename").blur();
    

    return true;
}