var canvas; //캔버스
var x,y;    //중앙점

// 창크기 변경, 캔버스 세팅
window.onload = function () {     //창 로딩됫을때
  canvas = document.getElementById("myCanvas");
  setCanvasSize();
};
window.onresize = function () {   //창 사이즈 재설정 되었을때
  setCanvasSize();
};

function setCanvasSize() {
  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.offsetHeight;
  x = document.body.offsetWidth / 2;
  y = document.body.offsetHeight / 2;
}
//--------------------------------

function calcAngleDegrees(x, y) { //아크탄젠트 계산 함수
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function mousemoving(event) {   //마우스 움직임 이벤트
  var radius = ((x - event.offsetX) ** 2 + (y - event.offsetY) ** 2) ** 0.5;  //마우스와의 거리 구함
  draw(event, radius);  //원그림
  var angle = calcAngleDegrees(event.offsetX - x, event.offsetY - y);   //x축과의 각도 구함
  if (angle > 0) {
    angle -= 360;
  }
  angle *= -1;

  drawangle(event, radius, angle);  //각그림
  action_coords(event);             //왼쪽위 정보 저장
  document.getElementById("debug_out").innerHTML +=
    "radious: " + radius + "<br/>";
  document.getElementById("debug_out").innerHTML +=
    "x: " + (event.offsetX - x) + " y: " + (event.offsetY - y) + "<br/>";
  document.getElementById("debug_out").innerHTML += "angle: " + angle + "<br/>";
}

function action_coords(event) {
  var x1 = event.clientX;
  var y1 = event.clientY;
  var x2 = event.offsetX;
  var y2 = event.offsetY;
  var x3 = event.screenX;
  var y3 = event.screenY;
  var coords = "clientX: " + x1 + ", clientY: " + y1 + "<br/>";
  coords += "offsetX: " + x2 + ", offsetY: " + y2 + "<br/>";
  coords += "screenX: " + x3 + ", screenY: " + y3 + "<br/>";
  document.getElementById("debug_out").innerHTML = coords;
}

function draw(event, radius) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.stroke();
}

function drawangle(event, radius, angle) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, 0, (Math.PI / 180) * angle * -1, true);
  ctx.fillStyle = "rgb(0, 255, 255)";
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}