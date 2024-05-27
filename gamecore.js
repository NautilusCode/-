//グローバル変数の定義//
//ネタ画像//
var img_maguro = new Image();
img_maguro.src = "maguro.png";
var img_kyuuri = new Image();
img_kyuuri.src = "kyuuri.png";
var img_ikura = new Image();
img_ikura.src = "ikura.png";
var img_ebi = new Image();
img_ebi.src = "ebi.png";
var img_tamago = new Image();
img_tamago.src = "tamago.png";
var img_sakuradenbu = new Image();
img_sakuradenbu.src = "sakuradenbu.png";
var img_tai = new Image();
img_tai.src = "tai.png";
var img_kanpyou = new Image();
img_kanpyou.src = "kanpyou.png";
var img_samon = new Image();
img_samon.src = "samon.png";
var img_wasabi = new Image();
img_wasabi.src = "wasabi.png";
//客画像//
var img_hito1 = new Image();
img_hito1.src = "hito1.png";
var img_hito2 = new Image();
img_hito2.src = "hito2.png";
var img_hito3 = new Image();
img_hito3.src = "hito3.png";
var img_hito4 = new Image();
img_hito4.src = "hito4.png";
var img_hito5 = new Image();
img_hito5.src = "hito5.png";
var img_hito6 = new Image();
img_hito6.src = "hito6.png";
var img_hito7 = new Image();
img_hito7.src = "hito7.png";
var img_hito8 = new Image();
img_hito8.src = "hito8.png";
var img_hito9 = new Image();
img_hito9.src = "hito9.png";
var img_hito10 = new Image();
img_hito10.src = "hito10.png";
//その他の画像//
var img_gohan = new Image();
img_gohan.src = "gohan.png";
var img_nori = new Image();
img_nori.src = "nori.png";
var img_kansei = new Image();
img_kansei.src = "kansei.png";
var img_wrong = new Image();
img_wrong.src = "wrong.png"
var img_correct = new Image();
img_correct.src = "correct.png";
var img_result = new Image();
img_result.src = "result.png";


//システム関係//
//ネタコード//
var maguro = 1;
var kyuuri = 10;
var ikura = 100;
var ebi = 1000;
var tamago = 10000;
var sakuradenbu = 100000;
var tai = 1000000;
var kanpyou = 10000000;
var samon = 100000000;
var wasabi = 1000000000;
//ゲーム進行関連//
var order2 = 0; //注文生成と商品番号の紐付け//
var order_name = "デフォルト";
var choice_neta = 0; //ボタンを押して追加したネタの値//
var count_buttonpush = 0; //ネタボタンを押した数を数える//
var now_open = 0;
var open = 0;//来客イベント数//
var count_correct = 0 //提供成功数//
var skill = 0;//熟練度//
var fail = 0;//提供ミス数//
var game_timer = 0;//ゲームタイマー//
var min = 1;//ゲームタイマー(分)
var sec = 30;//ゲームタイマー(秒)
var ticks = 90;//ゲームタイマー(残り秒数)
var cushome = 0;//客退店数//
//タイマー制御用//
var flag = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
var guest_timer = 0;
var guest2_timer = 0;
//左右ボタン制御用//
var re_b = 0;
var go_b = 0;
//BGM・SE//
var playbgm = new Audio('playbgm.mp3');
var startse = new Audio('start.mp3');
var endse = new Audio('end.mp3');
var correctse = new Audio('correct.mp3');
var wrongse = new Audio('wrong.mp3');

//タイマー//
//ゲームタイマー//
function timerStart() {
    document.getElementById('go').innerHTML = "巻く!";
    game_timer = setInterval(tick, 1000);
}
function tick() {
    ticks = ticks - 1;
    min = Math.floor(ticks / 60);
    sec = ticks % 60;
    if (sec < 10) {
        document.getElementById('timer').innerHTML = "残り時間" + min + ":0" + sec;
    } else {
        document.getElementById('timer').innerHTML = "残り時間" + min + ":" + sec;
    }
    console.log(document.getElementById('timer').innerHTML)
    if (ticks == 0) {
        endse.play();
        result();
        now_open = 0;
    }
}

//判定後来客タイマー//
function guest_timerStart() {
    clearInterval(guest_timer);
    guest_timer = setInterval(guest_tick, 500);
}
function guest_tick() {
    flag = 1;
    Guest();
}

//退客タイマー//
function guest2_timerStart() {
    guest2_timer = setInterval(guest2_tick, 6000);
}
function guest2_tick() {
    flag = 0;
    flag3 = 1;
    if (flag4 == 0) {
        cushome += 1;
        skill = skill - 1;
        document.getElementById("correct_counter").innerHTML = "熟練ポイント" + skill;
        var canvas2 = document.getElementById("customer");
        var ctx = canvas2.getContext("2d");
        ctx.fillText("遅いなあ...もう帰る!", 10, 140, 180);
        ctx.drawImage(img_wrong, 0, 200);
        wrongse.play();
        guest_timerStart();
    }
}

//メニュー//
// 鉄火巻き　まぐろ、わさび
// カッパ巻き　きゅうり、わさび
// かんぴょう巻き　かんぴょう
// 海鮮巻き(松) まぐろ、たい、サーモン、えび
// 海鮮巻き(竹)  まぐろ、サーモン、えび
// 海鮮巻き(梅)  まぐろ、サーモン
// 若気の至り　わさび×4
// 名物太巻き　まぐろ、桜でんぶ、かんぴょう、たまご
// お子様巻き　たまご、えび、きゅうり
// 卵巻き　たまご×2、いくら×2
// 大地の恵み　たまご、かんぴょう、きゅうり、わさび
// 三文字巻き　いくら、たまご、わさび、まぐろ
// 桜満開巻き　桜でんぶ×4
// 親子巻き　いくら、サーモン
// ヘルシー巻き かんぴょう、きゅうり、わさび
// えびでたいを巻く　えび×3,たい
// オレンジ巻き　いくら、えび、サーモン

var tekka = 1000000001;
var kappa = 1000000010;
var kanpyoumaki = 10000000;
var kaisen_matsu = 101001001;
var kaisen_take = 100001001;
var kaisen_ume = 100000001;
var meifuto = 10110001;
var okosama = 11010;
var tamagomaki = 20200;
var daichi = 1010010010;
var wakage = 4000000000;
var sanmoji = 1000010101;
var mankai = 400000;
var oyako = 100000100;
var healty = 1010000010;
var ebitai = 1003000;
var orange = 100001100;

//ネタ選択//
//ネタボタンのonclickで呼び出す関数を10個作る
function Maguro() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + maguro;
        ctx.drawImage(img_maguro, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Kyuuri() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + kyuuri;
        ctx.drawImage(img_kyuuri, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Ikura() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + ikura;
        ctx.drawImage(img_ikura, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Ebi() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + ebi;
        ctx.drawImage(img_ebi, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Tamago() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + tamago;
        ctx.drawImage(img_tamago, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Sakuradenbu() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + sakuradenbu;
        ctx.drawImage(img_sakuradenbu, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Tai() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + tai;
        ctx.drawImage(img_tai, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Kanpyou() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + kanpyou;
        ctx.drawImage(img_kanpyou, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Samon() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + samon;
        ctx.drawImage(img_samon, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}
function Wasabi() {
    if (now_open != 0) {
        var canvas = document.getElementById("mainwindow");
        var ctx = canvas.getContext("2d");
        choice_neta = choice_neta + wasabi;
        ctx.drawImage(img_wasabi, count_buttonpush * 100 + 50, 0);
        count_buttonpush += 1;
    }
}

//選択リセット//
function reset() {
    count_buttonpush = 0;
    choice_neta = 0;
    drawRice();
}

//メニューの描画//
function drawMenu() {
    var canvas3 = document.getElementById("menu");
    var ctx = canvas3.getContext("2d");
    var menu_text0 = "お品書き";
    var menu_text1 = "・鉄火巻き  まぐろ、わさび";
    var menu_text2 = "・かっぱ巻き  きゅうり、わさび";
    var menu_text3 = "・かんぴょう巻き  かんぴょう";
    var menu_text4 = "・海鮮巻き(松)  まぐろ、たい、サーモン、えび";
    var menu_text5 = "・海鮮巻き(竹)  まぐろ、サーモン、えび";
    var menu_text6 = "・海鮮巻き(梅)  まぐろ、サーモン";
    var menu_text7 = "・名物太巻き  まぐろ、桜でんぶ、かんぴょう、たまご";
    var menu_text8 = "・お子様巻き  たまご、えび、きゅうり";
    var menu_text9 = "・卵巻き  たまご2、いくら2";
    var menu_text10 = "・大地の恵み  たまご、かんぴょう、きゅうり、わさび";
    var menu_text11 = "・若気の至り  わさび4";
    var menu_text12 = "・三文字巻き  まぐろ、いくら、たまご、わさび";
    var menu_text13 = "・桜満開巻き  桜でんぶ4";
    var menu_text14 = "・親子巻き  いくら、サーモン";
    var menu_text15 = "・ヘルシー巻き  かんぴょう、きゅうり、わさび";
    var menu_text16 = "・えびでたいを巻く  えび3、たい";
    var menu_text17 = "・オレンジ巻き  いくら、えび、サーモン";
    var base_y = 80;
    var gyoukan = 36;
    ctx.font = "40px sans-serif";
    ctx.fillText(menu_text0, 10, 40, 390);
    ctx.font = "20px sans-serif";
    ctx.fillText(menu_text1, 0, base_y, 390);
    ctx.fillText(menu_text2, 0, base_y + gyoukan, 390);
    ctx.fillText(menu_text3, 0, base_y + gyoukan * 2, 390);
    ctx.fillText(menu_text4, 0, base_y + gyoukan * 3, 390);
    ctx.fillText(menu_text5, 0, base_y + gyoukan * 4, 390);
    ctx.fillText(menu_text6, 0, base_y + gyoukan * 5, 390);
    ctx.fillText(menu_text7, 0, base_y + gyoukan * 6, 390);
    ctx.fillText(menu_text8, 0, base_y + gyoukan * 7, 390);
    ctx.fillText(menu_text9, 0, base_y + gyoukan * 8, 390);
    ctx.fillText(menu_text10, 0, base_y + gyoukan * 9, 390);
    ctx.fillText(menu_text11, 0, base_y + gyoukan * 10, 390);
    ctx.fillText(menu_text12, 0, base_y + gyoukan * 11, 390);
    ctx.fillText(menu_text13, 0, base_y + gyoukan * 12, 390);
    ctx.fillText(menu_text14, 0, base_y + gyoukan * 13, 390);
    ctx.fillText(menu_text15, 0, base_y + gyoukan * 14, 390);
    ctx.fillText(menu_text16, 0, base_y + gyoukan * 15, 390);
    ctx.fillText(menu_text17, 0, base_y + gyoukan * 16, 390);
}

//左右ボタン制御//
//左ボタン制御//
function Open() {
    // console.log(now_open)
    now_open += 1
    if ((now_open == 1) || (go_b == 1)) {
        startse.play();
        playbgm.play();
        go_b = 0;
        document.getElementById('reset').innerHTML = "リセット";
        default_value();
        Guest();
        drawMenu();
    } else {
        Judge();
    }
}

//右ボタン制御//
function Open2() {
    if (now_open == 0) {
        location.href = 'index.html';
    } else {
        if (re_b == 1) {
            location.href = 'index.html';
        } else {
            reset();
        }
    }

}

//来客(「開店」及び「巻く!」を押したら発火)//
function Guest() {
    //タイマー管理//
    reset();
    if (flag == 0) {
        clearInterval(guest2_timer);
        guest2_timerStart();
    } else if (flag == 1) {
        clearInterval(guest_timer);
        clearInterval(guest2_timer);
        guest2_timerStart();
    }
    // flag = 2;
    flag3 = 0;
    flag4 = 0;
    open += 1;
    if (open == 1) {
        timerStart();
    }
    //客の注文を生成//
    var order = Math.random() * 17;
    order = Math.floor(order);
    if (order == 0) {
        order2 = tekka;
        order_name = "鉄火巻き"
    } else if (order == 1) {
        order2 = kappa;
        order_name = "かっぱ巻き"
    } else if (order == 2) {
        order2 = kaisen_matsu
        order_name = "海鮮巻き(松)"
    } else if (order == 3) {
        order2 = kaisen_take;
        order_name = "海鮮巻き(竹)"
    } else if (order == 4) {
        order2 = kaisen_ume;
        order_name = "海鮮巻き(梅)"
    } else if (order == 5) {
        order2 = wakage;
        order_name = "若気の至り"
    } else if (order == 6) {
        order2 = meifuto;
        order_name = "名物太巻き"
    } else if (order == 7) {
        order2 = daichi;
        order_name = "大地の恵み"
    } else if (order == 8) {
        order2 = okosama;
        order_name = "お子様巻き"
    } else if (order == 9) {
        order2 = tamagomaki;
        order_name = "卵巻き"
    } else if (order == 10) {
        order2 = sanmoji;
        order_name = "三文字巻き"
    } else if (order == 11) {
        order2 = mankai;
        order_name = "桜満開巻き"
    } else if (order == 12) {
        order2 = oyako;
        order_name = "親子巻き"
    } else if (order == 13) {
        order2 = healty;
        order_name = "ヘルシー巻き"
    } else if (order == 14) {
        order2 = ebitai;
        order_name = "海老で鯛を巻く"
    } else if (order == 15) {
        order2 = orange;
        order_name = "オレンジ巻き"
    } else if (order == 16) {
        order2 = kanpyoumaki;
        order_name = "かんぴょう巻き"
    }
    console.log(order);
    console.log(order2);
    //客を生成//
    count_buttonpush = 0;
    //注文セリフ生成//
    var order_text1 = "自己紹介";
    var order_text2 = order_name + "をください。";
    var order_text3 = "オプション１";
    var customer_number = Math.random() * 10;
    customer_number = Math.floor(customer_number);
    var canvas2 = document.getElementById("customer");
    var ctx = canvas2.getContext("2d");
    ctx.clearRect(0, 0, 200, 400);
    ctx.font = "20px sans-serif";
    ctx.fillText(order_text2, 10, 65, 180);
    //オプション1(追加具材)生成//
    var option_1 = Math.random() * 9;
    option_1 = Math.floor(option_1);
    var op1_dis = Math.random() * 4;
    op1_dis = Math.floor(op1_dis);
    if (option_1 == 0) {
        var order_text3 = "まぐろを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + maguro;
        }
    } else if (option_1 == 1) {
        var order_text3 = "きゅうりを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + kyuuri;
        }
    } else if (option_1 == 2) {
        var order_text3 = "いくらを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + ikura;
        }
    } else if (option_1 == 3) {
        var order_text3 = "えびを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + ebi;
        }
    } else if (option_1 == 4) {
        var order_text3 = "たまごを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + tamago;
        }
    } else if (option_1 == 5) {
        var order_text3 = "桜でんぶを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + sakuradenbu;
        }
    } else if (option_1 == 6) {
        var order_text3 = "たいを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + tai;
        }
    } else if (option_1 == 7) {
        var order_text3 = "かんぴょうを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + kanpyou;
        }
    } else if (option_1 == 8) {
        var order_text3 = "サーモンを追加してね。";
        if (op1_dis == 3) {
            order2 = order2 + samon;
        }
    }
    if (op1_dis == 3) {
        ctx.fillText(order_text3, 10, 90, 180);
    }
    //オプション2(わさび抜き生成)//
    var op2_dis = 0
    var order_text4 = "サビ抜きにしてね。"
    if ((order == 0) || (order == 1) || (order == 7) || (order == 10) || (order == 13)) {
        op2_dis = Math.random() * 2;
        op2_dis = Math.floor(op2_dis);
        if (op2_dis == 1) {
            order2 = order2 - wasabi;
            ctx.fillText(order_text4, 10, 115, 180);
        }
    }
    //注文セリフ描画//
    if (customer_number == 0) {
        ctx.drawImage(img_hito1, 0, 200);
        order_text1 = "私は西郷隆盛。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 1) {
        ctx.drawImage(img_hito2, 0, 200);
        order_text1 = "私はライプニッツ。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 2) {
        ctx.drawImage(img_hito3, 0, 200);
        order_text1 = "私は石川五右衛門。";
        ctx.fillText(order_text1, 10, 40, 180);
        ctx.fillText(order_text2, 10, 65, 180);
    } else if (customer_number == 3) {
        ctx.drawImage(img_hito4, 0, 200);
        order_text1 = "私は道元。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 4) {
        ctx.drawImage(img_hito5, 0, 200);
        order_text1 = "私は天草四郎。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 5) {
        ctx.drawImage(img_hito6, 0, 200);
        order_text1 = "私は与謝野晶子。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 6) {
        ctx.drawImage(img_hito7, 0, 200);
        order_text1 = "私は芥川龍之介。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 7) {
        ctx.drawImage(img_hito8, 0, 200);
        order_text1 = "私はクレオパトラ。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else if (customer_number == 8) {
        ctx.drawImage(img_hito9, 0, 200);
        order_text1 = "私は水戸光圀。";
        ctx.fillText(order_text1, 10, 40, 180);
    } else {
        ctx.drawImage(img_hito10, 0, 200);
        order_text1 = "私は正岡子規。";
        ctx.fillText(order_text1, 10, 40, 180);
    }
    // console.log(customer_number)
    drawRice();
}

//ごはんと海苔の描画//
function drawRice() {
    var canvas = document.getElementById("mainwindow");
    var ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, 600, 400);
    ctx.drawImage(img_nori, 0, 0);
    ctx.drawImage(img_gohan, 50, 0);
}

//正誤判定(巻く!を押したら発火))//
function Judge() {
    var canvas = document.getElementById("mainwindow");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img_kansei, 0, 0);
    var canvas2 = document.getElementById("customer");
    var ctx = canvas2.getContext("2d");
    if (choice_neta == order2) {
        if (flag3 == 0) {
            flag4 = 1;
            ctx.drawImage(img_correct, 0, 200);
            ctx.fillText("注文通り!ありがとう!", 10, 140, 180);
            correctse.play();
            count_correct += 1;
            skill += 1;
        }
    } else {
        if (flag3 == 0) {
            flag4 = 1;
            ctx.drawImage(img_wrong, 0, 200);
            ctx.fillText("注文と違う!!", 10, 140, 180);
            wrongse.play();
            skill = skill - 1;
            fail += 1;
        }
    }
    console.log(choice_neta);
    choice_neta = 0;;
    document.getElementById("correct_counter").innerHTML = "熟練ポイント" + skill;
    guest_timerStart();
}

//リザルト画面表示//
function result() {
    console.log("end");
    clearInterval(game_timer);
    clearInterval(guest_timer);
    clearInterval(guest2_timer);
    document.getElementById('go').innerHTML = "もう一度営業";
    go_b = 1;
    document.getElementById('reset').innerHTML = "ホームに戻る";
    re_b = 1;
    //プレイ記録感想//
    if (skill >= 20) {
        var cuscom = "世界一の巻き寿司屋だ!!";
        var mycom = "制作者の記録(熟練ポイント20)以上です。君が伝説だ。";
    } else if (fail >= 5) {
        var cuscom = "頼んだものと違うことが多いなあ...。";
        var mycom = "提供ミスが多すぎます。丁寧に作りましょう。";
    } else if (cushome >= 5) {
        var cuscom = "提供が遅すぎて待ちきれないよ...。";
        var mycom = "まずはお品書きをよく覚えましょう。";
    } else {
        var cuscom = "あともう少し早ければ文句なし!!";
        var mycom = "制作者の記録(熟練ポイント20)を目指せ!!";
    }
    var canvas = document.getElementById("mainwindow");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 400);
    var base_y = 80;
    var gyoukan = 35;
    ctx.font = "40px sans-serif";
    ctx.fillText("営業終了!", 10, 40, 590);
    ctx.font = "20px sans-serif";
    ctx.fillText("客からのコメント:" + cuscom, 10, base_y, 590);//接客数表示//
    ctx.fillText("制作者からのコメント:" + mycom, 10, base_y + gyoukan, 590);//提供成功数表示//
    ctx.drawImage(img_result, 0, 150);
    //売上表表示//
    var canvas2 = document.getElementById("customer");
    var ctx = canvas2.getContext("2d");
    ctx.clearRect(0, 0, 200, 400);
    var failall = fail + cushome;//提供失敗数//
    var opendis = count_correct + failall;//接客数//
    var correctrate = Math.round(count_correct / opendis * 100);//提供成功率
    ctx.font = "40px sans-serif";
    ctx.fillText("売上表", 10, 40, 180);
    ctx.font = "20px sans-serif";
    ctx.fillText("熟練ポイント    " + skill, 10, base_y, 180);//熟練ポイント表示//
    ctx.fillText("接客数    " + opendis, 10, base_y + gyoukan, 180);//接客数表示//
    ctx.fillText("提供成功数    " + count_correct, 10, base_y + gyoukan * 2, 180);//提供成功数表示//
    ctx.fillText("提供ミス数    " + fail, 10, base_y + gyoukan * 3, 180);//提供成功数表示//
    ctx.fillText("客退店数    " + cushome, 10, base_y + gyoukan * 4, 180);//客退店表示//
    ctx.fillText("提供失敗数    " + failall, 10, base_y + gyoukan * 5, 180);//提供失敗数表示//
    ctx.fillText("提供成功率    " + correctrate + "%", 10, base_y + gyoukan * 6, 180);//提供失敗数表示//
}

//再営業の際の変数初期化//
function default_value() {
    open = 0;//来客数//
    skill = 0;//熟練度//
    count_correct = 0 //正解数カウント//
    fail = 0;//提供ミス数//
    cushome = 0;//客退店数//
    game_timer = 0;//ゲームタイマー//
    min = 1;//ゲームタイマー(分)
    sec = 30;//ゲームタイマー(秒)
    ticks = 90;//ゲームタイマー(残り秒数)
    choice_neta = 0; //ボタンを押して追加したネタの値//
    document.getElementById("correct_counter").innerHTML = "熟練ポイント" + skill;
    re_b = 0;
}



