
function start_btn() {
    document.getElementsByClassName("main")[0].style.display = 'none';
    document.getElementsByClassName("kiosk_simulation")[0].style.display = 'flex';
    document.getElementById("mega_start_img").style.display = 'none';
    document.getElementById("mega_start_btn").style.display = 'none';
    document.getElementById("mega_order").style.display = 'block';
    document.getElementById("mega_menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    hide_order_list();

    document.getElementById("설명").style.display = 'block';
    document.getElementById("step1").style.display = 'block';
    document.getElementById("터치").style.display = 'block';
}

function hide_order_list() {
    var list = document.getElementsByClassName("cart");
    for (let i = 0; i < list.length; i++) { // 'let'으로 변수 선언
        list[i].style.display = 'none';
    }
}

var index = 1;

function 설명배경() {
    document.getElementById("설명배경").style.display = 'block';
}

function 터치() {
    index += 1;
    if (index === 2) {
        step2();
    }    
    if (index === 3) {
        step3();
    }
    if (index === 4) {
        step4();
    }
    if (index === 5) {
        step5();
    }
    if (index === 6) {
        step6();
    }
    if (index === 7) {
        step7();
    }
}



function step2() {
    document.getElementById("step1").style.display = 'none';
    document.getElementById("step2").style.display = 'block';
    document.getElementById("mega_menu_bar").style.border = 'none';  
    document.getElementById("mega_menu_table").style.border = 'solid red 8px';    

}
function step3() {
    document.getElementById("step2").style.display = 'none';
    document.getElementById("step3").style.display = 'block';
    document.getElementById("mega_menu_table").style.border = 'none';  
    document.getElementById("order_lsit").style.border = 'solid red 8px'; 
    document.getElementById("order_1").style.display = 'block';  
    document.getElementById("total_price").innerHTML="2000원"+"<br>결제하기";
}
function step4() {
    document.getElementById("step3").style.display = 'none';
    document.getElementById("step4").style.display = 'block';
    document.getElementById("order_lsit").style.border = 'none';  
    document.getElementById("pay_btn").style.border = 'solid red 8px';    

}
function step5() {
    document.getElementById("step4").style.display = 'none';
    document.getElementById("step5").style.display = 'block';
    document.getElementById("window_pay").style.display = 'block';

    document.getElementById("돌아가기").style.display = 'none';
    document.getElementById("먹고가기").style.display = 'none';
    document.getElementById("가져가기").style.display = 'none';
    
    document.getElementById("돌아가기_2").style.display = 'block';
    document.getElementById("쿠폰사용").style.display = 'block';
    document.getElementById("페이코").style.display = 'block';
    document.getElementById("카드결제").style.display = 'block';


    document.getElementById("pay_btn").style.border = 'none';  
    document.getElementById("window_pay").style.border = 'dashed green 3px'; 

}
function step6() {
    document.getElementById("step5").style.display = 'none';
    document.getElementById("step6").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_카드결제").style.display = 'block';
    document.getElementById("insert_card_moving").style.display = 'block';

    document.getElementById("insert_card").style.border = 'solid red 8px';    

}





function step7() {
    document.getElementById("step6").style.display = 'none';
    document.getElementById("step7").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_카드결제").style.display = 'none';
    document.getElementById("insert_card_moving").style.display = 'none';

    document.getElementById("insert_card").style.border = 'none'; 
    
    alert("키오스크의 기본에 대해 모두 학습했습니다. 이제 키오스크를 통해 주문하는 구체적인 방법을 학습해보세요. 확인 버튼을 누르면 처음 페이지로 이동합니다.");
    //location.href = "learn.html"
}
