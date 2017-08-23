var boxVal = "";
var results = "";

$('.reload').click(function() {
    location.reload(true);
});
//stupid iphones and their incompatibility with position:fixed
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
if (iOS === true) {
 
  document.getElementById('navbar1').classList.add('absolute');
  $('body').css('margin-top', 0);
} else {
   document.getElementById('navbar1').classList.add('fixed');
}
function test(form) {
  boxVal = form.searchbox.value;
  var query = encodeURI(boxVal.toLowerCase().replace(/\b[a-z]/g,function(f){return f.toUpperCase();}));
  var output = document.getElementById('testfield');
 $.ajax({
   url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&format=json&callback=?',
   type: 'GET',
   dataType: 'JSON',
   success: function(data) {
     var des = data[2][0];
     var w = des.includes('refers to');
     var ary = [];
     for (var i = 0; i < data[1].length; i++) {
       ary.push('<a href = "' + data[3][i] + '"><ul><li class = "title">' + data[1][i] + '</li><li class = "description">' + data[2][i] + '</li></ul>');
       }; 
     $('body').css('background-color', '#333');
     if ($(window).width() < 835) {
       $('#navbar1').animate({
         height: 120,
         padding: 5,
       }, 300);
     } else {
       $('#navbar1').animate({
         height: 65,
         padding: 5,
       }, 300);
     };
     
     $('#results').animate({opacity: 0}, 500, 'linear', function() {  
       $('#ar').html(ary);
       $('#searchterm').html('Search Term<br><p id = "st">' + decodeURI(query) + '</p');
     });
     $('#results').animate({opacity: 1}, 500);  
   }
 });
};

document.querySelector('#search').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      test(this.form);
    }
});