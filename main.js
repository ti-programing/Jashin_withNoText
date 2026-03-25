
//グローバル定数・変数
let pcs =[];
let btn1; 
let Llist;
let VLists;
let Flists;
let Hlists;

let resurrectionFlag; //邪神復活フラグ
let page; //現在のページを管理する変数


class pc{
    constructor(selects){
        this.id = selects.id;
        this.name = selects.name;
        this.life = selects.life;
        this.vote = selects.vote;
        this.faith = selects.faith;
        this.holy =  selects.holy;

        this.voted = 0;
        this.goukaed = false;
        this.burned = false;
        this.jomei = false;
        this.judged = false;
        this.revive = false;

        this.score = 0;
        this.selfkill = false;
    }
}


window.onload = function(){
    //変数pageを初期化
    page = 0;
    //各コンポーネントの読み込み
    btn1 = document.getElementById('btn1');
    btn2 = document.getElementsByClassName('btn2');
    btn3 = document.getElementsByClassName('btn3');
    Llists= [
        document.getElementById('l1'),
        document.getElementById('l2'),
        document.getElementById('l3'),
        document.getElementById('l4'),
        document.getElementById('l5'),
        document.getElementById('l6'),
    ]
    Vlists= [
        document.getElementById('v1'),
        document.getElementById('v2'),
        document.getElementById('v3'),
        document.getElementById('v4'),
    ];
    Flists= [
        document.getElementById('f1'),
        document.getElementById('f2'),
        document.getElementById('f3'),
        document.getElementById('f4'),
    ];
    Hlists= [
        document.getElementById('h1'),
        document.getElementById('h2'),
        document.getElementById('h3'),
        document.getElementById('h4'),
        document.getElementById('h5'),
        document.getElementById('h6'),
    ];

    //ボタン1
    btn1.addEventListener('click', () => {
        let stopFlag;
        for(let i=0; i<6; i++){
            if(Llists[i].selectedIndex <=0){
                alert("校長「入力漏れがあるようですよ！」");
                stopFlag = true;
                break;
            }else if(Hlists[i].selectedIndex <=0){
                alert("校長「入力漏れがあるようですよ！」");
                stopFlag = true;
                break;
            };
        }
        if(!stopFlag){
            for(let i=0; i<4; i++){
                if(Vlists[i].selectedIndex <=0){
                    alert("校長「入力漏れがあるようですよ！」");
                    stopFlag = true;
                    break;
                }else if(Flists[i].selectedIndex <=0){
                    alert("校長「入力漏れがあるようですよ！」");
                    stopFlag = true;
                    break;
                }
            }
        }
        //校長死亡はエラー扱い
        if (Llists[4].value == "死亡"){
            alert("校長「私は死んでおりませんよ？？」");
            stopFlag = true;
        }
        //PCが四名死亡している場合もエラー扱い
        let deathCount = 0;
        for(let i = 0; i<4; i++){
            if(Llists[i].value == "死亡"){
                deathCount += 1;
            }
        }
        if(deathCount > 3){
            alert("校長「そんなに沢山死体はないはずですよ！」");
            stopFlag = true;
        }
        //聖水三つ以上はエラー扱い
        let holyCount =0;
        Hlists.forEach(element => {
            if(element.value == "飲んだ"){
                holyCount += 1;
            }
        });
        if(holyCount > 2){
            alert("校長「聖水は、二つしかお渡ししていないはずですが……？」");
            stopFlag = true;
        }
        //処理の実行  
        if(!stopFlag){
            try{
                setPC();
                resultSetter(pcs);
                clearDisplay(page);
                displayPhase1();
             }
            catch{
                alert("予期せぬエラーが発生しました。最初からやり直してください。");
                window.location.reload();
            }
        }else{
            return;
        }
    });

    //ボタン2
    for(let i = 0; i<btn2.length; i++){
        btn2[i].addEventListener('click', () => {
            try{
                clearDisplay(page);
                nextDisplay(page);    
            }
            catch{
                alert("予期せぬエラーが発生しました。最初からやり直してください。");
                window.location.reload();
            }
        });
    }

    //ボタン3
    for(let i = 0; i<btn3.length; i++){
        btn3[i].addEventListener('click', () => {
            try{
                clearDisplay(page);
                backDisplay(page);    
            }
            catch{
                alert("予期せぬエラーが発生しました。最初からやり直してください。");
                window.location.reload();
            }
        });
    }

}


function setPC(){
    pcs[0] = new pc({
        id: 0,
        name: "dummy",
        life: false,
        vote: 0,
        faith: 0,
        holy: false,
    });;
    pcs[1] = new pc({
        id: 1,
        name: "花見",
        life: Converter(document.getElementById("l1").value),
        vote: Converter(document.getElementById("v1").value),
        faith: Converter(document.getElementById("f1").value),
        holy: Converter(document.getElementById("h1").value),
    });
    pcs[2] = new pc({
        id: 2,
        name: "鳥見",
        life: Converter(document.getElementById("l2").value),
        vote: Converter(document.getElementById("v2").value),
        faith: Converter(document.getElementById("f2").value),
        holy: Converter(document.getElementById("h2").value),
    });
    pcs[3] = new pc({
        id: 3,
        name: "風見",
        life: Converter(document.getElementById("l3").value),
        vote: Converter(document.getElementById("v3").value),
        faith: Converter(document.getElementById("f3").value),
        holy: Converter(document.getElementById("h3").value),
    });
    pcs[4] = new pc({
        id: 4,
        name: "月見",
        life: Converter(document.getElementById("l4").value),
        vote: Converter(document.getElementById("v4").value),
        faith: Converter(document.getElementById("f4").value),
        holy: Converter(document.getElementById("h4").value),
    });
    pcs[5] = new pc({
        id: 5,
        name: "校長",
        life: Converter(document.getElementById("l5").value),
        vote: 0,
        faith: 0,
        holy: Converter(document.getElementById("h5").value),
    });
    pcs[6] = new pc({
        id: 6,
        name: "生徒Ａ",
        life: Converter(document.getElementById("l6").value),
        vote: 0,
        faith: 0,
        holy: Converter(document.getElementById("h6").value),
    });
}


function Converter(target){
    switch (target){
        case "生存": return true; break;
        case "死亡": return false; break;
        case "花見": return 1; break;
        case "鳥見": return 2; break;
        case "風見": return 3; break;
        case "月見": return 4; break;
        case "校長": return 5; break;
        case "生徒Ａ": return 6; break;
        case "無信仰": return 0; break;
        case "飲んだ": return true; break;
        case "飲んでいない": return false; break;
        default: return 0; break;
    }    
}


function resultSetter(pcs){
    let bodies = 0;   //遺体の数（//邪神復活判定に使用）

    //得票を集計する
    for(let i=1; i<=4; i++){
        pcs[pcs[i].vote].voted += 1;
    }
    //業火の処理
    for(let i=1; i<=4; i++){
        if(pcs[i].holy){
            pcs[pcs[i].vote].goukaed = true;
            pcs[pcs[i].vote].life = !pcs[pcs[i].vote].life;
        };
    }
    //処刑の処理
    for(let i=1; i<=6; i++){
        //二票以上を得票している場合は処刑対象に
        if(pcs[i].voted >= 2){
            //校長およびその崇拝者は免除される。
            if(i === 5 || pcs[i].faith === 5){
                pcs[i].jomei = true;
                continue;
            }
            //それ以外は処刑実施
            pcs[i].burned = true;            
            pcs[i].life = false;
        }
        console.log(pcs[i].life);
    }

     //【新】崇拝者を一律で死亡させる
     for(let i=1; i<=4; i++){
        if(pcs[i].faith == 6){
            pcs[i].judged = true;
            pcs[i].life = false;
        }
    }

    //生徒Ａを除く死亡者の数を数える
    for(let i=1; i<=5; i++){
        if(!Boolean(pcs[i].life)){
            bodies++;
        }
    }

    //邪神の復活を判定する
    if(pcs[6].burned){
        resurrectionFlag = false;
    }else{
        if(pcs[6].life === true){
            resurrectionFlag = true;
        }else if(bodies >= 2){
            resurrectionFlag = true;
        }else{
            resurrectionFlag = false;
        }
    }

    //邪神の復活時には、邪神と崇拝者を復活させ他を死亡させる
    if(resurrectionFlag){
        pcs[5].life = false;
        pcs[6].life = true;
        for(let i=1; i<=4; i++){
            if(!pcs[i].life && pcs[i].faith==6){
                pcs[i].revive = true;
                pcs[i].life = true;
            }else if(pcs[i].life && pcs[i].faith==6){
                pcs[i].life = true;
            }else{
                pcs[i].life = false;
            }
        }
    }

    
    //復活処理の終了後、スコアを集計する
    //②自分の崇拝者の数
    for(let i=1; i<=4; i++){
        for(let j=1; j<=4; j++){
            if(pcs[j].faith == i){
                pcs[i].score += 30;
            }
        }
    }
    //②他の死亡者の数
    for(let i=1; i<=4; i++){
        for(let j=1; j<=6; j++){
            //自分はカウントから除外
            if(j==i){ continue; }
            if(!Boolean(pcs[j].life)){
                pcs[i].score += 20;
            }
        }
    }
    //③死亡している場合は×0
    for(let i=1; i<=4; i++){
        if(!pcs[i].life){
            pcs[i].score = 0;
        }
    }
    //スコアに応じて、自殺したかの判定を行う
    for(let i=1; i<=4; i++){
        if(pcs[i].life && pcs[i].score < 60){
            pcs[i].selfkill = true;
            pcs[i].life = false;
            pcs[i].score = 0;
        }else{
            pcs[i].selfkill = false;
        }
    }
}


function clearDisplay(page){
    let target;
    switch(page){
        case 0: target = document.getElementById("index"); break;
        case 1: target = document.getElementById("phase1"); break;
        case 2: target = document.getElementById("phase2"); break;
        case 3: target = document.getElementById("phase3"); break;
        case 4: target = document.getElementById("results"); break;
        default: break;
    }
    //要素のクリア
    target.style.display = "none";
    window.scroll({top: 0, behavior: 'instant'});
}


function nextDisplay(page){
    switch(page){
        case 1: displayPhase2(); break;
        case 2: displayPhase3(); break;
        case 3: displayResults(); break;
        default: alert("予期せぬエラーが発生しました。最初からやり直してください。");   window.location.reload; break;
    }
}


function backDisplay(page){
    switch(page){
        case 1: displayIndex(); break;
        case 2: displayPhase1(); break;
        case 3: displayPhase2(); break;
        case 4: displayPhase3(); break;
        default: alert("予期せぬエラーが発生しました。最初からやり直してください。");  window.location.reload; break;
    }
}


function displayIndex(){
    //変数pageを書き換え
    page = 0;
    document.getElementById("index").style.display = "block";
}


function displayPhase1(){
    //変数pageを書き換え
    page = 1;
    let phase1 = document.getElementById("phase1");
    //goukaedListに、業火の対象を格納
    let goukaedList = [];
    for(let i=1; i<=6; i++){
        if(pcs[i].goukaed){
            goukaedList.push(pcs[i].name);
        }
    }

    //業火対象がいない場合、処理をスキップ
    if(goukaedList.length<1){
        phase1.getElementsByClassName("endText")[0].innerText = "今回の結果においては、＜phase1＞はスキップされます。"+"\n" +"このまま「進む」ボタンを押してください。";
        phase1.style.display = "block";
        return;
    }

    //業火対象全員を「〇〇と××」の形で表示
    let goukaTargets = document.getElementsByClassName("goukaTargets");
    for(let i=0; i<goukaTargets.length; i++){
        goukaTargets[i].textContent = goukaedList.join("と");
    }
    //業火対象であれば、専用テキストを表示。
    console.log(document.getElementById("dummyGoukaed"));   //エラー回避用 
    let goukaMessages = [
        document.getElementById("dummyGoukaed"),
        document.getElementById("hanamiGoukaed"),
        document.getElementById("torimiGoukaed"),
        document.getElementById("kazamiGoukaed"),
        document.getElementById("tsukimiGoukaed"),
        document.getElementById("kouchouGoukaed"),
        document.getElementById("muchikoGoukaed")
    ];
    console.log(goukaMessages);   //デバッグ用  
    goukaMessages[0].style.display = 'none';
    for(let i=1; i<=6; i++){
        goukaMessages[i].style.display = 'none';
        if(pcs[i].goukaed){
            goukaMessages[i].style.display = 'block';
        }
    }

    //校長が業火対象であるか否かによって、最後の一文が分岐。
    if(!pcs[5].goukaed){
        document.getElementById("normalDanzai").style.display = 'block';
        document.getElementById("burnedDanzai").style.display = 'none';
    }else{
        document.getElementById("normalDanzai").style.display = 'none';
        document.getElementById("burnedDanzai").style.display = 'block';
    }
    //ページを表示.
    phase1.style.display = "block";
    window.scroll({top: 0, behavior: 'instant'});
}


function displayPhase2(){
    //変数pageを書き換え
    page = 2;
    let phase2 = document.getElementById("phase2");
    //executeList；処刑対象リスト
    let executeList = [];
    for(let i=1; i<=6; i++){
        if(pcs[i].burned){
            executeList.push(pcs[i].name);
        }
    }
    //jomeiList；助命対象リスト
    let jomeiList = [];
    for(let i=1; i<=5; i++){
        if(pcs[i].jomei){
            jomeiList.push(pcs[i].name);
        }
    }

    //助命対象も処刑対象もいない場合、noJudgeを表示しておしまい
    if(executeList.length<1 && jomeiList.length<1){
        document.getElementById("yesJudge").style.display = "none";
        document.getElementById("noJudge").style.display = "block";
        phase2.style.display = "block";
        return;
    }
    //そうでない場合は、yedJudgeを表示
    else{
        document.getElementById("yesJudge").style.display = "block";
        document.getElementById("noJudge").style.display = "none";
    }

    //助命対象がいない場合、助命テキストを非表示
    if(jomeiList.length<1){
        document.getElementById("jomei").style.display = "none";
    }
    //助命対象がいる場合
    else{
        document.getElementById("jomei").style.display = 'block';
        //校長以外の助命対象がいるか判定
        let kouchouCount = 0;
        let anotherJomei = false;
        if(jomeiList.includes("校長")){
            kouchouCount = 1;
        }
        if(jomeiList.length - kouchouCount > 0){
            anotherJomei = true;
        }

        //校長が助命対象にいない場合
        if(kouchouCount < 1){
            document.getElementById("selfJomei").style.display = 'none';
        }
        //いる場合
        else{
            document.getElementById("selfJomei").style.display = 'block';
        }

        //校長以外の助命対象がいない場合
        if(!anotherJomei){
            document.getElementById("soloJomei").style.display = 'none';
            document.getElementById("multiJomei").style.display = 'none';
        }
        //いる場合
        else{
            //助命対象全員を「〇〇さん、××さん」の形で表示
            let jomeiTargets = document.getElementsByClassName("jomeiTargets");
            //校長を取り除いてから文字列を生成
            let filterJomeiList = jomeiList.filter(function(element){
                return !(element == "校長");
            });
            let tmpstr = filterJomeiList.join("さん、");
            tmpstr = tmpstr.concat("さん");
            for(let i=0; i<jomeiTargets.length; i++){
                jomeiTargets[i].textContent = tmpstr;
            }
            //soloJomeiまたはmultiJomeiを採用
            if(jomeiList.length <= 1){
                document.getElementById("soloJomei").style.display = 'block';
                document.getElementById("multiJomei").style.display = 'none';
            }else{
                document.getElementById("soloJomei").style.display = 'none';
                document.getElementById("multiJomei").style.display = 'block';
            }
        }

        //他に処刑対象がいない場合
        if(executeList.length < 1){
            document.getElementById("executeBreak").style.display = 'block';
            document.getElementById("executeContinue").style.display = 'none';
            document.getElementById("burning").style.display = 'none';
        }
        //いる場合
        else{
            document.getElementById("executeBreak").style.display = 'none';
            document.getElementById("executeContinue").style.display = 'block';
            document.getElementById("burning").style.display = 'block';
        }
    }

    //処刑対象がいない場合、処刑テキストを非表示
    if(executeList.length < 1){
        document.getElementById("burning").style.display = 'none';
    }
    //処刑対象がいる場合  
    else{
        document.getElementById("burning").style.display = 'block';
        //処刑対象全員を「〇〇と××」の形で表示
        let burnTargets = document.getElementsByClassName("burnTargets");
        for(let i=0; i<burnTargets.length; i++){
            burnTargets[i].textContent = executeList.join("と");
        }
        //executeMessages：処刑テキストリスト
        console.log(document.getElementById("dummyBurned"));    //エラー回避用
        let executeMessages = [
            document.getElementById("dummyBurned"),
            document.getElementById("hanamiBurned"),
            document.getElementById("torimiBurned"),
            document.getElementById("kazamiBurned"),
            document.getElementById("tsukimiBurned"),
            document.getElementById("kouchouBurned"),
            document.getElementById("muchikoBurned")
        ];
        console.log(executeMessages);   //デバッグ用
        //処刑対象であれば、専用テキストを表示。
        executeMessages[0].style.display = 'none';
        for(let i=1; i<=6; i++){
            executeMessages[i].style.display = 'none';
            if(pcs[i].burned){
                executeMessages[i].style.display = 'block';
            }
        }
    }
    //ページを表示.
    phase2.style.display = "block";
    window.scroll({top: 0, behavior: 'instant'});
}


function displayPhase3(){
    //変数pageを書き換え
    page = 3;
    let phase3 = document.getElementById("phase3");
    //believerList：崇拝者リスト
    let believerList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].faith==6){
            believerList.push(pcs[i].name);
        }
    }
    //judgedList：被断罪者リスト
    let judgedList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].judged){
            judgedList.push(pcs[i].name);
        }
    }
    //reviverList：蘇生者リスト
    let reviverList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].revive){
            reviverList.push(pcs[i].name);
        }
    }
    //suiciderList：自殺者リスト
    let suiciderList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].selfkill){
            suiciderList.push(pcs[i].name);
        }
    }
    //surviverList：生存者リスト
    let surviverList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].life){
            surviverList.push(pcs[i].name);
        }
    }

    //崇拝者全員を「〇〇と××」の形で表示
    let believers = document.getElementsByClassName("believers");
    for(let i=0; i<believers.length; i++){
        believers[i].textContent = believerList.join("と");
    }
    //被断罪者全員を「〇〇と××」の形で表示
    let judgeTargets = document.getElementsByClassName("judgeTargets");
    for(let i=0; i<judgeTargets.length; i++){
        judgeTargets[i].textContent = judgedList.join("と");
    }
    //蘇生者全員を「〇〇と××」の形で表示
    let revivers = document.getElementsByClassName("revivers");
    for(let i=0; i<revivers.length; i++){
        revivers[i].textContent = reviverList.join("と");
    }
    //自殺者全員を「〇〇と××」の形で表示
    let suiciders = document.getElementsByClassName("suiciders");
    for(let i=0; i<suiciders.length; i++){
        suiciders[i].textContent = suiciderList.join("と");
    }
    //生存者全員を「〇〇と××」の形で表示
    let survivers = document.getElementsByClassName("survivers");
    for(let i=0; i<survivers.length; i++){
        survivers[i].textContent = surviverList.join("と");
    }


    //被断罪者全員を「〇〇さんと××さん」の形で表示
    let judgeTargetsWith_SAN = document.getElementsByClassName("judgeTargetsWith_SAN");
    for(let i=0; i<judgeTargetsWith_SAN.length; i++){
        let tmpstr;
        tmpstr = judgedList.join("さん、");
        tmpstr = tmpstr.concat("さん");
        judgeTargetsWith_SAN[i].textContent = tmpstr;
    }
    //被断罪者がいない場合は、断罪テキストを非表示
    if(judgedList.length<1){
        document.getElementById("judge").style.display = 'none';
    }
    //崇拝者がいる場合
    else{
         //judgedMessages：被断罪者セリフリスト
        let judgedMessages =[
            document.getElementById("dummyJudged"),
            document.getElementById("hanamiJudged"),
            document.getElementById("torimiJudged"),
            document.getElementById("kazamiJudged"),
            document.getElementById("tsukimiJudged"),
        ];
        for(let i=1; i<=4; i++){
            judgedMessages[i].style.display = 'none';
            if(pcs[i].judged){
                judgedMessages[i].style.display = 'block';
            }
        }
        //断罪テキストを表示
        document.getElementById("judge").style.display = 'block';
    }


    //邪神が復活しなかった場合
    if(!resurrectionFlag){
        //自殺者がいない場合は、自殺テキストを非表示
        if(suiciderList.length<1){
            document.getElementsByClassName("suicide")[0].style.display = 'none';
        }
        //自殺者がいる場合
        else{
            //suiciderMessages1：自殺者セリフリスト①
            let suiciderMessages1 =[
                document.getElementById("dummySuicide"),
                document.getElementById("hanamiSuicide"),
                document.getElementById("torimiSuicide"),
                document.getElementById("kazamiSuicide"),
                document.getElementById("tsukimiSuicide"),
            ];
            for(let i=1; i<=4; i++){
                suiciderMessages1[i].style.display = 'none';
                if(pcs[i].selfkill){
                    suiciderMessages1[i].style.display = 'block';
                }
            }
            //自殺テキストを表示
            document.getElementsByClassName("suicide")[0].style.display = 'block';
        }

        //生存者がいる場合
        if(surviverList.length>0){
            //soloSurviverまたはmultiSurviverを採用
            if(surviverList.length==1){
                if(surviverList[0] == "風見"){
                    document.getElementsByClassName("sex")[0].innerText = "彼女";
                }
                document.getElementsByClassName("soloSurviver")[0].style.display = 'block';
                document.getElementsByClassName("multiSurviver")[0].style.display = 'none';

            }else{
                document.getElementsByClassName("soloSurviver")[0].style.display = 'none';
                document.getElementsByClassName("multiSurviver")[0].style.display = 'block';
            }
            document.getElementsByClassName("yesSurviver")[0].style.display = 'block';
            document.getElementsByClassName("noSurviver") [0].style.display = 'none';
        }
        //生存者がいない場合
        else{
            document.getElementsByClassName("yesSurviver")[0].style.display = 'none';
            document.getElementsByClassName("noSurviver")[0].style.display = 'block';
        }
        //校長が業火で焼かれている場合、kouchouDeathを表示
        if(pcs[5].goukaed){
            document.getElementById("kouchouDeath").style.display = 'block';
        }else{
            document.getElementById("kouchouDeath").style.display = 'none';
        }

        //ブロックの表示切替
        document.getElementById("noResurrect").style.display = 'block';
        document.getElementById("yesResurrect").style.display = 'none';
    }


    //邪神が復活した場合
    else{
        //崇拝者がいない場合は、蘇生テキストおよび崇拝テキストを非表示
        if(believerList.length<1){
            document.getElementById("revive").style.display = 'none';
            document.getElementById("believe").style.display = 'none';
            document.getElementById("believe2").style.display = 'none';
        }
        //崇拝者がいる場合
        else{
            //蘇生者がいない場合は、蘇生テキストを非表示
            if(reviverList.length<1){
                document.getElementById("revive").style.display = 'none';
            }
            //蘇生者がいる場合
            else{
                document.getElementById("revive").style.display = 'block';
                //reviverMessages：蘇生者のセリフリスト
                let reviverMessages =[
                    document.getElementById("dummyRevive"),
                    document.getElementById("hanamiRevive"),
                    document.getElementById("torimiRevive"),
                    document.getElementById("kazamiRevive"),
                    document.getElementById("tsukimiRevive"),
                ]
                reviverMessages[0].style.display = 'none';
                for(let i=1; i<=4; i++){
                    reviverMessages[i].style.display = 'none';
                    if(pcs[i].revive){
                        reviverMessages[i].style.display = 'block';
                    }
                }
            }
            //believerMessages：崇拝者セリフリスト
            let believerMessages =[
                document.getElementById("dummyBelieve"),
                document.getElementById("hanamiBelieve"),
                document.getElementById("torimiBelieve"),
                document.getElementById("kazamiBelieve"),
                document.getElementById("tsukimiBelieve"),
            ];
            believerMessages[0].style.display = 'none';
            for(let i=1; i<=4; i++){
                believerMessages[i].style.display = 'none';
                if(pcs[i].faith == 6){
                    believerMessages[i].style.display = 'block';
                }
            }
            //崇拝セリフテキストを表示
            document.getElementById("believe").style.display = 'block';
            //崇拝者が単独の場合はsoloBelieverを、複数の場合はmultiBelieverを採用
            let target1 = document.getElementsByClassName("soloBeliever");
            let target2 = document.getElementsByClassName("multiBeliever");
            if(believerList.length == 1){
                for(let i=0; i<target1.length; i++){
                    target1[i].style.display = 'block';
                }
                for(let i=0; i<target2.length; i++){
                    target2[i].style.display = 'none';
                }
            }else{
                for(let i=0; i<target1.length; i++){
                    target1[i].style.display = 'none';
                }
                for(let i=0; i<target2.length; i++){
                    target2[i].style.display = 'block';
                }
            }

            //自殺者がいない場合は、自殺テキストを非表示
            if(suiciderList.length<1){
                document.getElementsByClassName("suicide")[1].style.display = 'none';
            }
            //自殺者がいる場合
            else{
                //suiciderMessages2：自殺者セリフリスト②
                let suiciderMessages2 =[
                    document.getElementById("dummySuicide2"),
                    document.getElementById("hanamiSuicide2"),
                    document.getElementById("torimiSuicide2"),
                    document.getElementById("kazamiSuicide2"),
                    document.getElementById("tsukimiSuicide2"),
                ];
                for(let i=1; i<=4; i++){
                    suiciderMessages2[i].style.display = 'none';
                    if(pcs[i].selfkill){
                        suiciderMessages2[i].style.display = 'block';
                    }
                }
                //自殺テキストを表示
                document.getElementsByClassName("suicide")[1].style.display = 'block';
            }
            //崇拝者テキストを表示
            document.getElementById("believe").style.display = 'block';
            document.getElementById("believe2").style.display = 'block';
        }

        //生存者がいる場合
        if(surviverList.length>0){
            //soloSurviverまたはmultiSurviverを採用
            if(surviverList.length == 1){
                if(surviverList[0] == "風見"){
                    document.getElementsByClassName("sex")[1].innerText = "彼女";
                }
                document.getElementsByClassName("soloSurviver")[1].style.display = 'block';
                document.getElementsByClassName("multiSurviver")[1].style.display = 'none';
            }else{
                document.getElementsByClassName("soloSurviver")[1].style.display = 'none';
                document.getElementsByClassName("multiSurviver")[1].style.display = 'block';
            }
            document.getElementsByClassName("yesSurviver")[1].style.display = 'block';
            document.getElementsByClassName("noSurviver") [1].style.display= 'none';
        }
        //生存者がいない場合
        else{
            document.getElementsByClassName("yesSurviver")[1].style.display = 'none';
            document.getElementsByClassName("noSurviver")[1].style.display = 'block';
        }

        //ブロックの表示切替
        document.getElementById("noResurrect").style.display = 'none';
        document.getElementById("yesResurrect").style.display = 'block';
    }

    //ページを表示。
    phase3.style.display = "block";
    window.scroll({top: 0, behavior: 'instant'});
}


function displayResults(){
    //変数pageを書き換え
    page = 4;
    let results = document.getElementById("results");
    //生死を文字列化
    let aliveOrDeath = [];
    aliveOrDeath[0] = "dummy";
    for(let i= 1; i<=4; i++){
        if(pcs[i].life){
            if(!resurrectionFlag && i==4){
                aliveOrDeath[i] = "着任";
            }else{
                aliveOrDeath[i] = "入学";
            }
            
        }else{
            aliveOrDeath[i] = "死亡";
        }
    }
    //タグ「name」を編集
    document.getElementById("name1").innerText = "花見：" + aliveOrDeath[1];
    document.getElementById("name2").innerText = "鳥見：" + aliveOrDeath[2];
    document.getElementById("name3").innerText = "風見：" + aliveOrDeath[3];
    document.getElementById("name4").innerText = "月見：" + aliveOrDeath[4];
    ///タグ「score」を編集
    let target = document.getElementsByClassName("score")
    let scoreAry = [0, pcs[1].score, pcs[2].score, pcs[3].score, pcs[4].score]
    target[1].innerText = scoreAry[1];
    target[2].innerText = scoreAry[2];
    target[3].innerText = scoreAry[3];
    target[4].innerText = scoreAry[4];

    //最多スコアを赤字表示
    let pointer = 0;
    let maxIndex = []; //maxIndexは1～4までの値を格納し得る
    for(let i=1; i<scoreAry.length; i++){
        pointer = scoreAry.indexOf(Math.max.apply(null, scoreAry), pointer+1)
        if(pointer < 1){
            break; 
        }
        else{
            maxIndex.push(pointer);
        }
    }
    console.log(maxIndex); //デバッグ用
    for(i=0; i<maxIndex.length; i++){
        target[maxIndex[i]].style.color = "red";
        target[maxIndex[i]].style.fontWeight = "bold";
    }

    //normalResultまたはallDeathResultを採用
    //surviverList：生存者リスト　※displayPhase3()と同名の配列
    let surviverList = [];
    for(let i=1; i<=4; i++){
        if(pcs[i].life){
            surviverList.push(pcs[i].name);
        }
    }
    //mvpsList：MVPリスト（要素はPCオブジェクト）
    let mvpsList = [];
    for(let i=0; i<maxIndex.length; i++){
        mvpsList.push(pcs[maxIndex[i]]);
    }

    //生存者が一人以上いる場合
    if(surviverList.length>0){
        //MVP（最大スコア獲得者）を全員を「〇〇と××」の形で表示
        let mvps = document.getElementsByClassName("MVP");
        let mvpPCNames = [];
        for(let i=0; i<mvpsList.length; i++){
            mvpPCNames.push("PC" + mvpsList[i].id + "_" + mvpsList[i].name + "さん")
        }
        for(let i=0; i<mvps.length; i++){
            mvps[i].textContent = mvpPCNames.join("／");
        }
        //テキスト表示
        document.getElementById("normalResult").style.display = 'block';
        document.getElementById("allDeathResult").style.display = 'none';
    //全滅した場合
    }else{
        //テキスト表示
        document.getElementById("normalResult").style.display = 'none';
        document.getElementById("allDeathResult").style.display = 'block';
    }

    //ページを表示
    results.style.display = "block";
    window.scroll({top: 0, behavior: 'instant'});
}
