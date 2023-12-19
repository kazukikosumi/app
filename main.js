window.onload = function() {
    $('body').fadeIn(500); //1秒かけてフェードイン！
  }

const card = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["11", "22", "33", "44", "55", "66", "77", "88", "99", "1010"],
    ["1と5", "2と6", "3と9", "4と8", "7と10"]
]

let n = 0;
let num = n + 1;
let a = card[0].length;
let cardNumber = card[0];

let b = card[1].length;
let NGNumber = card[1];

while (a) {
    var j = Math.floor(Math.random() * a);
    var t = cardNumber[--a];
    cardNumber[a] = cardNumber[j];
    cardNumber[j] = t;
}

console.log(cardNumber)


while (b) {
    var k = Math.floor(Math.random() * b);
    var y = NGNumber[--b];
    NGNumber[b] = NGNumber[k];
    NGNumber[k] = y;
}

console.log(NGNumber);


const cardNumAdd = () => {
    for (let i = 1; i < 21; i++) {
        document.getElementById("card" + num++).innerHTML = cardNumber[n++];

    }
}

cardNumAdd();

const cardimg = () => {
    for (let i = 1; i < 21; i++) {
        let cardBg = document.getElementById("card" + i);
        let cardBgNum = document.getElementById("card" + i).innerHTML;
        let cardBgTarget = cardBg.closest(".front");
        // console.log(cardBg);
        // console.log(cardBgNum);
        // console.log(cardBgTarget);
        let url = "url(img/card" + cardBgNum + ".jpg";
        cardBgTarget.style.backgroundImage = url;
    }
}

cardimg();


const p = document.createElement("p");
const p2 = document.createElement("p");
const combination = document.getElementById("combination")

const cardButton = (e) => {
    let combCount = (combination.childElementCount);
    // console.log(combCount);
    if (combCount == 0) {
        const ButtomNum1 = document.getElementById("card" + e).textContent;
        combination.appendChild(p);
        let comb1 = combination.querySelector("p:first-child");
        comb1.setAttribute('id', 'comb1');
        document.getElementById("comb1").innerHTML = ButtomNum1;
        const cardSelect = document.getElementById("card" + e);
        let cradHiddenTarget = cardSelect.closest(".cardN");
        cradHiddenTarget.classList.add("select");
        cradHiddenTarget.disabled = "disabled";

    } else if (combCount == 1) {
        const ButtomNum1 = document.getElementById("card" + e).textContent;
        combination.appendChild(p2);
        let comb2 = combination.querySelector("p:last-child");
        comb2.setAttribute('id', 'comb2');
        document.getElementById("comb2").innerHTML = ButtomNum1;
        const cardSelect = document.getElementById("card" + e);
        let cradHiddenTarget = cardSelect.closest(".cardN");
        cradHiddenTarget.classList.add("select");


        NGcheck();
        sameCard();

    }
}

const NGcheck = () => {
    const comb1v = document.getElementById("comb1").innerHTML;
    const comb2v = document.getElementById("comb2").innerHTML;
    // console.log(comb1v);
    // console.log(comb2v);
    if (comb1v + comb2v == NGNumber[0]) {
        let ngcard = document.querySelectorAll('.select .ngcard');
        console.log(ngcard);

        setTimeout(() => {
            ngcard[0].classList.add("ngcard_active");
            ngcard[1].classList.add("ngcard_active");
        }, 1500);

        setTimeout(() => {
            document.getElementById("gameover").classList.add("gameover_active");
        }, 4000);
    }
}

let miss = 0;
let life = 4;
let same = 0;

const sameCard = () => {
    const comb1v = document.getElementById("comb1").innerHTML;
    const comb2v = document.getElementById("comb2").innerHTML;
    // console.log(comb1v);
    // console.log(comb2v);
    if (comb1v == comb2v) {
        // console.log("同じです");
        let elements = document.getElementsByClassName("select");
        Array.prototype.forEach.call(elements, function (element) {
            setTimeout(() => {
                element.classList.add("card_hidden");
            }, 3000);
            gameClear()
        });
        let selects = document.getElementsByClassName("cardN");
        Array.prototype.forEach.call(selects, function (element) {
            setTimeout(() => {
                element.classList.remove("select");
                combination.innerHTML = "";
            }, 3500);
        });
        let sameCardCount = document.getElementsByClassName("card_hidden").length;
        setTimeout(() => {
            document.getElementById("sameCount").innerHTML = sameCardCount + 2;
        }, 3500);
        missCount = miss
        if (missCount >= 1) {
            missCount = miss--
            life++
            console.log(missCount);
            setTimeout(() => {
                if (missCount == 0) {

                } else if (missCount == 1) {
                    document.getElementById("life4").classList.remove("life_break");
                } else if (missCount == 2) {
                    document.getElementById("life3").classList.remove("life_break");
                } else if (missCount == 3) {
                    document.getElementById("life2").classList.remove("life_break");
                }
            }, 3000);
        }
        sameCount = same++
        console.log(sameCount);
        setTimeout(() => {
            if (sameCount == 0) {
                tips();
            } else if (sameCount == 2) {
                tips2();
            } else if (sameCount == 4) {
                tips3();
            }
        }, 3000);

    } else {
        let selects = document.getElementsByClassName("cardN");
        Array.prototype.forEach.call(selects, function (element) {
            setTimeout(() => {
                element.classList.remove("select");
                combination.innerHTML = "";
            }, 3500);
        });
        missCount = miss++
        life--
        // console.log(missCount);
        setTimeout(() => {
            if (missCount == 0) {
                document.getElementById("life4").classList.add("life_break");
            } else if (missCount == 1) {
                document.getElementById("life3").classList.add("life_break");
            } else if (missCount == 2) {
                document.getElementById("life2").classList.add("life_break");
            } else if (missCount == 3) {
                document.getElementById("life1").classList.add("life_break");
            }
        }, 3000);
        setTimeout(() => {
            if (missCount >= 3) {
                document.getElementById("gameover").classList.add("gameover_active");
            }
        }, 3800);
    }
}

const StartMenuButton = () => {
    document.getElementById("gameStartMenu").classList.add("gameStartMenu_close");
    document.getElementById("gamestart").classList.add("gamestart_active");
    CountDownTimer2();
}

const creditButton = () => {
    document.getElementById("credit").classList.add("credit_active");
}

const closeButton = () => {
    document.getElementById("credit").classList.remove("credit_active");
}

const descriptionButton = () => {
    document.getElementById("description").classList.add("description_active");
}

const closeButton2 = () => {
    document.getElementById("description").classList.remove("description_active");
}


//  timer
let countDownTimer = 99; // 制限時間

const CountDownTimer = () => {
    document.getElementById("countDown").innerHTML = countDownTimer;
    if (!countDownTimer == 0) {
        setTimeout(() => {
            countDownTimer = countDownTimer - 1;
            CountDownTimer();
        }, 1000);
    } else {
        setTimeout(() => {
            document.getElementById("gameover").classList.add("gameover_active");
            // カウントをリセットする
            countDownTimer = 20;
            questionCount = 0;
            successCount = 0;
        })
    }
}


const gameClear = () => {
    let sameCardCount = document.getElementsByClassName("card_hidden").length + 2;
    if (sameCardCount >= 18) {
        // console.log("ゲームクリアです")
        let Time = document.getElementById("countDown").innerHTML
        document.getElementById("clearTime_dummy").innerHTML = Time;
        document.getElementById("clearTime_dummy2").innerHTML = life;
        document.getElementById("TotalTime").innerHTML = Time * 100 + life * 1000;
        setTimeout(() => {
            countDownTimer = 999;
        }, 500);
        setTimeout(() => {
            document.getElementById("gameclear").classList.add("gameclear_active");
        }, 5000);

    } else {
        // console.log("引き続き頑張りましょう")
    }
}


//  retrytimer
let countDownTimer2 = 5; // 制限時間

const CountDownTimer2 = () => {
    countDownTimer = 99;
    document.getElementById("gameover").classList.remove("gameover_active");
    document.getElementById("gameover").classList.add("gameover");
    document.getElementById("countDown2").innerHTML = countDownTimer2;
    if (!countDownTimer2 == 0) {
        setTimeout(() => {
            countDownTimer2 = countDownTimer2 - 1;
            CountDownTimer2();
        }, 1000);
    } else {
        setTimeout(() => {
            document.getElementById("gamestart").classList.add("gamestart_close");
            CountDownTimer();
            // カウントをリセットする
            countDownTimer2 = 5;
        })
    }

    let elements = document.getElementsByClassName("cardN");
    Array.prototype.forEach.call(elements, function (element) {
        setTimeout(() => {
            element.classList.remove("card_hidden");
        });
    });

}


// retry button
const reteyButton = () => {
    window.location.reload();
}

const reteyButton2 = () => {
    window.location.reload();
}

const reteyButton3 = () => {
    window.location.reload();
}

const retey = () => {
    countDownTimer = 1;
    document.getElementById("tips_text").innerHTML = "";
    same = 0;

    // 開始画面呼び出し
    setTimeout(() => {
        countDownTimer2 = 5;
        document.getElementById("gamestart").classList.remove("gamestart_close");
        CountDownTimer2();
    }, 1000)
    setTimeout(() => {
        document.getElementById("sameCount").innerHTML = 0;
    }, 500)

}

// ヒント
const tipslist = [
    ["1と5", "2と6", "3と9", "4と8"],
    ["1と5", "2と6", "3と9", "7と10"],
    ["1と5", "2と6", "4と8", "7と10"],
    ["1と5", "3と9", "4と8", "7と10"],
    ["2と6", "3と9", "4と8", "7と10"]
]

let c = tipslist[0].length;
let tipsRandom = tipslist[0];
while (c) {
    var l = Math.floor(Math.random() * c);
    var z = tipsRandom[--c];
    tipsRandom[c] = tipsRandom[l];
    tipsRandom[l] = z;
}

let c2 = tipslist[1].length;
let tipsRandom2 = tipslist[1];
while (c2) {
    var l = Math.floor(Math.random() * c2);
    var z = tipsRandom2[--c2];
    tipsRandom2[c2] = tipsRandom2[l];
    tipsRandom2[l] = z;
}

let c3 = tipslist[2].length;
let tipsRandom3 = tipslist[2];
while (c3) {
    var l = Math.floor(Math.random() * c3);
    var z = tipsRandom3[--c3];
    tipsRandom3[c3] = tipsRandom3[l];
    tipsRandom3[l] = z;
}

let c4 = tipslist[3].length;
let tipsRandom4 = tipslist[3];
while (c4) {
    var l = Math.floor(Math.random() * c4);
    var z = tipsRandom4[--c4];
    tipsRandom4[c4] = tipsRandom4[l];
    tipsRandom4[l] = z;
}

let c5 = tipslist[4].length;
let tipsRandom5 = tipslist[4];
while (c5) {
    var l = Math.floor(Math.random() * c5);
    var z = tipsRandom5[--c5];
    tipsRandom5[c5] = tipsRandom5[l];
    tipsRandom5[l] = z;
}

console.log(tipsRandom5);

const tips = () => {
    if (NGNumber[0] / 11 === 7 || NGNumber[0] / 101 === 10) {
        document.getElementById("tips_text").innerHTML = tipsRandom[0] + "は安全";
        console.log(tipsRandom[0] + "は安全");
    } else if (NGNumber[0] / 11 === 4 || NGNumber[0] / 11 === 8) {
        document.getElementById("tips_text").innerHTML = tipsRandom2[0] + "は安全";
        console.log(tipsRandom2[0] + "は安全");
    } else if (NGNumber[0] / 11 === 3 || NGNumber[0] / 11 === 9) {
        document.getElementById("tips_text").innerHTML = tipsRandom3[0] + "は安全";
        console.log(tipsRandom3[0] + "は安全");
    } else if (NGNumber[0] / 11 === 2 || NGNumber[0] / 11 === 6) {
        document.getElementById("tips_text").innerHTML = tipsRandom4[0] + "は安全";
        console.log(tipsRandom4[0] + "は安全");
    } else if (NGNumber[0] / 11 === 1 || NGNumber[0] / 11 === 5) {
        document.getElementById("tips_text").innerHTML = tipsRandom5[0] + "は安全";
        console.log(tipsRandom5[0] + "は安全");
    }
}

const tips2 = () => {
    if (NGNumber[0] % 2 === 1) {
        document.getElementById("tips_text2").innerHTML = "NGナンバーは奇数";
        console.log("NGナンバーは奇数");
    } else {
        document.getElementById("tips_text2").innerHTML = "NGナンバーは偶数";
        console.log("NGナンバーは偶数");
    }
}
// tips();

const tips3 = () => {
    if (NGNumber[0] / 11 > 4) {
        document.getElementById("tips_text3").innerHTML = "ナンバー4以下は安全";
        console.log("ナンバー4以下は安全");
    } else if (NGNumber[0] / 11 < 5) {
        document.getElementById("tips_text3").innerHTML = "ナンバー5以上は安全";
        console.log("ナンバー5以上は安全");
    }
}
// tips2();


// ローディング画面
function loadedPage() {
    const loadingID = document.getElementById("gameStartMenu");
    loadingID.classList.add("gameStartMenu_close");
}


if (!sessionStorage.getItem('visited')) {
    sessionStorage.setItem('visited', 'first');
    window.addEventListener('load', function () {
    });
} else {
    loadedPage();
    document.getElementById("gamestart").classList.add("gamestart_active");
    retey();
}

const backMenuButton = () => {
    sessionStorage.clear();
    window.location.reload();
}

const backMenuButton2 = () => {
    sessionStorage.clear();
    window.location.reload();
}


$('#clearTimebox').on('inview', function (event, isInView) {
    if (isInView) {
        let clearTime = document.getElementById("clearTime_dummy").innerHTML;
        setTimeout(() => {
            document.getElementById("clearTime_dummy").classList.add("clearTime_dummy_close");
            document.getElementById("clearTime").classList.add("count-down_active");
            //要素が見えたときに実行する処理
            $("#clearTimebox .count-down").each(function () {
                $(this).prop('Counter', clearTime).animate({//10からカウントダウン
                    Counter: $(this).text()
                }, {
                    // スピードやアニメーションの設定
                    duration: 2000,//数字が大きいほど変化のスピードが遅くなる。1000=1秒
                    easing: 'swing',//動きの種類。他にもlinearなど設定可能
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }, 2000);
    }
});

$('#clearTimebox2').on('inview', function (event, isInView) {
    if (isInView) {
        let clearLife = document.getElementById("clearTime_dummy2").innerHTML;
        setTimeout(() => {
            document.getElementById("clearTime_dummy2").classList.add("clearTime_dummy_close");
            document.getElementById("clearTime2").classList.add("count-down_active");
            //要素が見えたときに実行する処理
            $("#clearTimebox2 .count-down").each(function () {
                $(this).prop('Counter', clearLife).animate({//10からカウントダウン
                    Counter: $(this).text()
                }, {
                    // スピードやアニメーションの設定
                    duration: 2000,//数字が大きいほど変化のスピードが遅くなる。1000=1秒
                    easing: 'swing',//動きの種類。他にもlinearなど設定可能
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }, 4000);
    }
});

$('#TotalScorebox1').on('inview', function (event, isInView) {
    if (isInView) {
        setTimeout(() => {
            document.getElementById("clearTime_dummy3").classList.add("clearTime_dummy_close");
            document.getElementById("TotalTime").classList.add("count-down_active");
            //要素が見えたときに実行する処理
            $("#TotalScorebox1 .count-up").each(function () {
                $(this).prop('Counter', 0).animate({//0からカウントアップ
                    Counter: $(this).text()
                }, {
                    // スピードやアニメーションの設定
                    duration: 2000,//数字が大きいほど変化のスピードが遅くなる。2000=2秒
                    easing: 'swing',//動きの種類。他にもlinearなど設定可能
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }, 7000);
    }
});



