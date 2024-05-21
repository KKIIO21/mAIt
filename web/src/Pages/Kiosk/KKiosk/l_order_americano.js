function start_btn() {
    document.getElementsByClassName("main")[0].style.display = 'none';
    document.getElementsByClassName("kiosk_simulation")[0].style.display = 'flex';
    document.getElementById("mega_start_img").style.display = 'none';
    document.getElementById("mega_start_btn").style.display = 'none';
    document.getElementById("mega_order").style.display = 'block';
    document.getElementById("mega_menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    document.getElementById("mega_menu_bar").style.border = 'none';  
    hide_order_list();    
    document.getElementById("터치").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    

}

function hide_order_list() {
    var list = document.getElementsByClassName("cart");
    for (i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
}



/**/

function Item(name, price) {
    this.name = name;
    this.number = 0;
    this.price = parseInt(price);
}

var order_list = [];
function option(id, type, price) {
    var drink = document.getElementById(id);
    drink.style.borderStyle = 'solid';
    drink.style.borderColor = 'red';

    var order = new Item(id, price);
    order.number += 1;

    var cnt = 0;
    for (i = 0; i < order_list.length; i++) {
        if (order.name == order_list[i].name) {
            order_list[i].number += 1;
            cnt += 1;
        }
    }
    if (cnt == 0 || order_list.length == 0) {
        order_list.push(order);
    }
    
    open_order_list(order_list);

    if (type == "no_option") {
        /**/
    }
    check += 1;
}

var total_list= [0, 0];
function open_order_list(order_list) {
    var total_num = 0;
    var total_price = 0;

    for (i = 0; i < order_list.length; i++) {
        var order_id = "order_" + (i + 1);
        document.getElementById(order_id).style.display = 'flex';

        document.getElementById("range_" + (i + 1)).innerText = (i + 1) + ". " + (order_list[i].name);
        document.getElementById("amount_" + (i + 1)).innerText = (order_list[i].number) + "개";
        document.getElementById("item_price_" + (i + 1)).innerText = (order_list[i].price) * (order_list[i].number) + "원";
        
        total_num += order_list[i].number;
        total_price += (order_list[i].price)*(order_list[i].number);
    }
    document.getElementById("item_number").innerHTML= "_________________________<br>선택한 상품 " + (total_num) + "개";
    document.getElementById("total_price").innerHTML = (total_price)+"원<br>결제하기";
    total_list[0] = total_num;
    total_list[1] = total_price;

}


function delete_item(index) {
    order_list = order_list.splice(index, 1);
    open_order_list(order_list);
}


function open_window_pay () {

    document.getElementById("window_pay").style.display = 'block';
    document.getElementById("screen_to_window_pay").style.display  = 'block';
    write_order_list_window_pay(order_list);
    
    document.getElementById("w_total_number").innerText = total_list[0];
    document.getElementById("w_total_price").innerText =total_list[1];
    
    document.getElementById("돌아가기").style.display = 'none';
    document.getElementById("먹고가기").style.display = 'none';
    document.getElementById("가져가기").style.display = 'none';

    document.getElementById("돌아가기_2").style.display = 'block';
    document.getElementById("쿠폰사용").style.display = 'block';
    document.getElementById("페이코").style.display = 'block';
    document.getElementById("카드결제").style.display = 'block';
    

}


function close_window_pay () {
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display  = 'none';

}

function write_order_list_window_pay (order_list) {
    for (i=0; i<order_list.length; i++) {
        var window_id = "window_" + (i+1);
        document.getElementById(window_id).style.display = 'flex';
        document.getElementById("w_order_" + (i + 1)).innerText = (i + 1) + ". " + (order_list[i].name);
        document.getElementById("w_number_" + (i + 1)).innerText = (order_list[i].number) + "개 " + (order_list[i].price) * (order_list[i].number) + "원";


    }

}

function change_window_btn() {
    document.getElementById("돌아가기").style.display = 'none';
    document.getElementById("먹고가기").style.display = 'none';
    document.getElementById("가져가기").style.display = 'none';

    document.getElementById("돌아가기_2").style.display = 'block';
    document.getElementById("쿠폰사용").style.display = 'block';
    document.getElementById("페이코").style.display = 'block';
    document.getElementById("카드결제").style.display = 'block';
    
}

function back_2_window_btn() {
    document.getElementById("돌아가기").style.display = 'block';
    document.getElementById("먹고가기").style.display = 'block';
    document.getElementById("가져가기").style.display = 'block';

    document.getElementById("돌아가기_2").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    document.getElementById("페이코").style.display = 'none';
    document.getElementById("카드결제").style.display = 'none';
}

function open_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_카드결제_total_price").innerText = total_list[1]+"원";

    document.getElementById("insert_card_moving").style.display='block';
    document.getElementById("insert_card").style.border = 'solid red 8px'; 
    
}

function close_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    document.getElementById("insert_card_moving").style.display = 'none';

}



function herf_home() {
    location.href = "learn.html";
}



var check = 0;
function 결제완료() {
    if(check != 0) {
    alert("축하합니다. 아메리카노 주문하기 성공!");
    location.href = "learn.html";
    }
    else {
        alert("아메리카노 주문하기 실패! 다시 도전해보세요.");
        location.href = "learn.html";
    }
}