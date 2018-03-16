/* 2016 
 * Tuan Dang (on the BioLinker project, as Postdoc for EVL, UIC)
 *
 * THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTY.  IN PARTICULAR, THE AUTHORS MAKE NO REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
 * OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.
 */

 var tipWidth = 270;
var tipSVGheight = 370;
var tip_svg;
var y_svg;

var colorHighlight = "#fc8";
var buttonColor = "#ddd";
var cellHeight = 14;


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-(tipSVGheight),-tipWidth/2])
  .style('border', '1px solid #555');

function showTip(d) { 
  y_svg = -5; // inital y position     
    tip.offset([-10,-0])
    .html(function(d) {
      var str ="";
      str+="<b> Well data: </b>"
        str+="<table class='tableTip' style='width:100%; font-family: sans-serif; font-size: 12px;'>"
        for (key in d) {
          if (key== "getMyColor" || key== "minX"|| key== "minY"|| key== "maxX"|| key== "maxY"
            || key== "pointId" || key== "pointY"|| key== "color" //|| key== "active"
             || key=="distanceToSelectedWell" || key=="getName" || key=="setActive"
             || key=="interpolate")
            ;
          else if (key== "pointX"){
            var value1 = d[key];
            var value2 = d["pointY"];
            str+=  "<tr><td> Point </td> <td>  <span style='color:black'>("+value1+", "+value2+")</span> </td></tr>";
          }
          else if (key== "detail"){
            for (key2 in d.detail) {
              if (key2== "totalMeasurementDate"){
                ;
              }  
              else if (key2== "position"){
                str+=  "<tr><td>"+key2+"</td> <td>  <span style='color:black'>(" + d.detail[key2].lat+", "+ d.detail[key2].lon+ ")</span> </td></tr>";
              } 
              else if (key2== "county"){
                str+=  "<tr><td>"+key2+"</td> <td>  <span style='color:black'>" + d.detail[key2]+"</span> </td></tr>";
              } 
              else{ 
                var value2 = d.detail[key2];
                str+=  "<tr style='border: 2px;'><td border='1'> &nbsp;  &nbsp;"+key2.substring(0, 7)+"</td> <td>  <span style='color:"+ d.getMyColor()+"; text-shadow: 0px 1px 1px #000000;'> &nbsp; &nbsp;  &nbsp;" + Math.round(value2) + "</span> </td></tr>";
              }
            }  
          }
          else{
            var value = d[key];
            str+=  "<tr><td>"+key+"</td> <td>  <span style='color:black'>" + value + "</span> </td></tr>";
          }     
        } 
        str+="</table>"
      return str; 
    });
    tip.show(d);
 
  d3.select('.d3-tip')
  .on("mouseout", function(){
      tip.hide(d);
  }) 
}     