$(document).ready(function()
{
    
 $("#loadmore").click(function(){
     //alert( $("#loadmore").text().trim());
     if( $("#loadmore").text().trim() == 'Load More..'){
        $("#moreimg").removeClass("row-div-2");
        $("#loadmore").text("Load Less..");
     }
     else{
        $("#moreimg").addClass("row-div-2");
        $("#loadmore").text("Load More..");
     }

 });
 $("#next").click(function(){
     $("#vid").attr("src","http://localhost:4000/images/sample.mp4");
//$("#vid").html('<source src="http://localhost:4000/images/small.mp4" type="video/mp4">');
 });
 $("#pre").click(function(){
   $("#next").removeAttr("disabled");
    $("#vid").attr("src","http://localhost:4000/images/small.mp4");
//$("#vid").html('<source src="http://localhost:4000/images/small.mp4" type="video/mp4">');
});
});