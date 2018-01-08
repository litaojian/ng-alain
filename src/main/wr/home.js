 function addNDays(date, n) {
     var d = new Date(Date.parse(date.replace(/-/g, "/")));
     var time = d.getTime();
     var newTime = time + n * 24 * 60 * 60 * 1000;
     return new Date(newTime);
 }

 function formatDate(date) {
     var tmp = date.toString();
     tmp = tmp.replace('年', '/');
     tmp = tmp.replace('月', '/');
     tmp = tmp.replace('日', '');
     tmp = tmp.replace('/', '-');
     tmp = tmp.replace('/', '-');
     return tmp;
 }

 function changeDate(event, flag) {

     var beginDate = $("input[name='beginDate']").val();
     var endDate = null;
     //alert(beginDate);
     var options = { year: 'numeric', month: 'long', day: 'numeric' };
     var date1, date2;
     if (flag == 1) {
         var _date = addNDays(beginDate, 7);
         beginDate = _date;
         date1 = formatDate(_date.toLocaleString('zh-CN', options));
         _date = addNDays(date1, 6);
         endDate = _date;
         date2 = formatDate(_date.toLocaleString('zh-CN', options));

     } else {
         var _date = addNDays(beginDate, -7);
         beginDate = _date;
         date1 = formatDate(_date.toLocaleString('zh-CN', options));
         _date = addNDays(date1, 6);
         endDate = _date;
         date2 = formatDate(_date.toLocaleString('zh-CN', options));
     }

     //$("input[name='beginDate']").val(date1);
     //$("input[name='endDate']").val(date2);

     event.preventDefault();
     event.stopPropagation();

     var formData = {};
     formData.beginDate = date1;
     formData.endDate = date2;

     $("#queryForm").attr("eventData", JSON.stringify(formData));

     $("#queryForm").trigger(jQuery.Event("click"));
     $("#queryBtn").trigger(jQuery.Event("click"));

 }