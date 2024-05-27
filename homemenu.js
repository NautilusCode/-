var canvas = document.getElementById('canvas').getContext('2d');
//https://www.photo-ac.com/main/detail/3079493
var loading = new Image(); loading.src = 'nigiri_going.jpg';
//https://www.photo-ac.com/main/detail/1426007s
var ready = new Image(); ready.src = 'nigiri_supply.jpg';
var timer = null;

//偽ローディング画面
loading.onload = function () {
    //寿司にぎり中画像を最適なサイズで表示
    var multiple = 900 / 1920;
    canvas.drawImage(loading, 0, 0, 900, 1280 * multiple);
    //ロゴとloadingの表示
    canvas.font = "81px serif";
    canvas.fillText("スーパー巻き寿司職人", 20, 80)
    canvas.font = "35px serif";
    canvas.fillText("Loading...", 700, 580)
    //1回きりタイマー
    timer = setInterval(onReady, 1800)
}

//自称読み込み完了、偽開始ボタン
//開始判定はcanvasにonclick=location.hrefを仕込み済み
function onReady() {
    //スケジューラクリア
    clearInterval(timer);
    //canvasリセット
    canvas.clearRect(0, 0, 900, 600);
    //寿司提供画像を最適なサイズで
    var multiple = 900 / 640;
    canvas.drawImage(ready, 0, 0, 900, 427 * multiple);
    //ロゴを再表示
    canvas.font = "81px serif";
    canvas.fillText("スーパー巻き寿司職人", 20, 80)
    //偽開始ボタン
    canvas.fillStyle = 'black'
    canvas.fillRect(250, 500, 400, 60)
    canvas.fillStyle = 'glay'
    canvas.strokeRect(250, 500, 400, 60)
    canvas.font = "40px serif";
    canvas.fillStyle = 'white';
    canvas.fillText("営業開始", 375, 545, 150)
}