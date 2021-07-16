function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
  }
});


function api_main(url, data, func){
  console.log(data);
  $.ajax({
    type: "POST",
    url: url,
    data: data
  }).done(func);

}
username="";
chat_id = "";
chat_token = "";
length_message_chat = 0;
message_izm = 0;
// function structure_dragstart(){
// 	tasksListElement = document.querySelector(`.structures`);
// 	taskElements = tasksListElement.querySelectorAll(`.structure`);
// 	// Перебираем все элементы списка и присваиваем нужное значение
// 	next = "";
// 	for (const task of taskElements) {
// 		task.draggable = true;
// 	}

// 	tasksListElement.addEventListener(`dragstart`, (evt) => {
// 		evt.target.classList.add(`selected`);
// 	})

// 	tasksListElement.addEventListener(`dragend`, (evt) => {
// 		now = tasksListElement.querySelector(`.selected`).getAttribute("pk");
// 		console.log(next);
// 		child = tasksListElement.children;
// 		if (next == null){
// 			next = 10000;
// 		}else{
// 			next = next.getAttribute("pk");
// 		}
// 		page_pk = $('.page_pk').text();
// 		//console.log(page_pk);
// 		$.ajax({
// 			type: "POST",
// 			url: "/api/v1/structures/update_order/",
// 			data: {
// 				pk:now, 
// 				pk_next: next,
// 				page_pk:page_pk,
// 			},
// 		});
// 		evt.target.classList.remove(`selected`);
// 		//alert(next);

// 	});
// 	tasksListElement.addEventListener(`dragover`, (evt) => {
// 		// Разрешаем сбрасывать элементы в эту область
// 		evt.preventDefault();

// 	});
// 	tasksListElement.addEventListener(`dragover`, (evt) => {

// 		const activeElement = tasksListElement.querySelector(`.selected`);
// 		const currentElement = evt.target;
// 		const isMoveable = activeElement !== currentElement &&
// 		currentElement.classList.contains(`structure`);

// 		if (!isMoveable) {
// 		return;
// 		}

// 		// evt.clientY — вертикальная координата курсора в момент,
// 		// когда сработало событие
// 		const nextElement = getNextElement(evt.clientY, currentElement);
// 		next = nextElement;
// 		// Проверяем, нужно ли менять элементы местами
// 		if (
// 		nextElement && 
// 		activeElement === nextElement.previousElementSibling ||
// 		activeElement === nextElement
// 		) {
// 		// Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
// 		return;
// 		}
// 		//console.log(currentElement.getAttribute("order"));
// 		//console.log(nextElement.getAttribute("order"));
// 		tasksListElement.insertBefore(activeElement, nextElement);
// 	});
// }
// function structure_update(pk){
// 	$.ajax({
// 		type: "GET",
// 		url: "/api/v1/structures/"+pk+"/",
// 		success: function(data){	 
// 			//$('.structures').html();
// 			//alert(data);
// 			html = "";
// 			data.forEach((element) => {
// 				html += '<div class="text-block structure" pk="'+element.pk+'">'+element.name+'</div>';
// 				console.log(element.pk);
// 			});
// 			$('.structures').html(html);
// 			$(".page_pk").text(pk);
// 			structure_dragstart();
// 			console.log(data);			
// 		}

// 	});
// }
// function settings_update(pk, type_setting){
// 	$.ajax({
// 		type: "GET",
// 		url: "/api/v1/settings/"+pk+"/"+type_setting+"/",
// 		success: function(data){	 
// 			//$('.structures').html();
// 			//alert(data);
// 			html = "";
// 			data.forEach((element) => {
// 				html += '<div class="div-block-3"><div class="text-block-4">'+element.name+'</div></div>';
// 			});
// 			$('.settings').html(html);
// 			$(".structure_pk").text(pk);
// 			structure_dragstart();		
// 		}

// 	});
// }

// structure_dragstart();

// const getNextElement = (cursorPosition, currentElement) => {
// 	// Получаем объект с размерами и координатами
// 	const currentElementCoord = currentElement.getBoundingClientRect();
// 	// Находим вертикальную координату центра текущего элемента
// 	const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

// 	// Если курсор выше центра элемента, возвращаем текущий элемент
// 	// В ином случае — следующий DOM-элемент
// 	const nextElement = (cursorPosition < currentElementCenter) ?
// 		currentElement :
// 		currentElement.nextElementSibling;

// 	return nextElement;
// };

// $('.page').click(function(){
// 	pk = $(this).attr("pk");
// 	console.log(pk);
// 	structure_update(pk);
// });
// $(document).on('click','.structure', function(){
// 	pk = $(this).attr("pk");
// 	console.log(pk);
// 	settings_update(pk, $('.setting_type').text());
// });
// $('.settings_type').click(function(){
// 	pk = $(this).attr("pk");
// 	$('.setting_type').text(pk);
// 	settings_update($('.structure_pk').text(), pk);
// });
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function decrypt_text(text, key, iv = CryptoJS.enc.Base64.parse("            ")) {
  return CryptoJS.AES.decrypt(text, key, {
      iv: iv
  }).toString(CryptoJS.enc.Utf8);
}

function encrypt_text(text, key, iv = CryptoJS.enc.Base64.parse("            ")) {
  return CryptoJS.AES.encrypt(text, key, {
      iv: iv
  }).toString();
}

function encrypt_key(text) {
  return CryptoJS.SHA3(text, { outputLength: 512 }).toString();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var qr;
(function() {
  qr = new QRious({
      element: document.getElementById('qr-code'),
      size: 200,
      value: 'Empty Token. SOSI'
  });
})();


function generateToken() {
  var p = document.getElementById('ryiaf');
  var button = document.getElementById('loh');
  var input = document.getElementById('suckmydick').value;
  if (input != "") {
      string = "";
      let i = 0;
      private_key = "";
      public_key = "";
      var alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      while (string.length != 131) {
          if (string.length == 30) {
              string += ":";
          }
          ch = alf.charAt(Math.floor(Math.random() * alf.length));
          if (string.length <= 30) {
              public_key += ch;
          } else {
              private_key += ch;
          }
          string += ch;
          i++;
      }
      qr.set({
          foreground: 'black',
          size: 200,
          value: string
      });
      p.innerHTML = "Private token: " + string;
      auth_code = encrypt_key(public_key+"ASdpasdRKremn"+private_key);
      console.log(auth_code);
      // $.ajax({
      //     type: "POST",
      //     url: "api/v1/user/create",
      //     data: {
      //         username: input,
      //         token: auth_code,
      //         public_key: public_key,
      //     },
      // });
      console.log(public_key);
      api_main("api/v1/user/create", {username: input, token: auth_code,public_key: public_key}, function d(data) {});
      localStorage.setItem('key', private_key);

      sleep(2000);
      login_ajax(auth_code, public_key);
  } else {
      alert("error input Nickname :)");
  }

}

function login_ajax(auth_code, public_key) {
  api_main("api/v1/user/session", {token: auth_code, public_key: public_key}, function d(data) {});
  //window.location.replace("/messager");
}
function login(){

  var keys = document.getElementById('login').value.split(':');
  console.log(keys);
  auth_code = encrypt_key(keys[0]+"ASdpasdRKremn"+keys[1]);
  localStorage.setItem('key', keys[1]);
  console.log(auth_code);
  login_ajax(auth_code, keys[0]);
}




function chat_get(data) {
  if (data.length == 0){
    $(".favorite_ul").html('<p style="color: #ffffff;position: absolute;font-weight: 700;top: 30px;right: 330px;">У вас нет контактов. Вы можете их найти →</p>');
    return 1;
  }
  html_ul = "";
  data.forEach((element) => {
    console.log(element);
    html_ul += '<li class="favorite-li">\
                    <div class="favorite-a" user_id="'+element.chat_id+'" username="'+element.username+'" status="'+element.status+'">\
                        <canvas id="canvas_'+element.id+'"></canvas>\
                        <p class="favorite-nick">'+element.username+'</p>\
                    </div>\
                </li>';
  });
  $(".favorite_ul").html(html_ul);
  data.forEach((element) => {
    let canvas = document.getElementById('canvas_'+element.id);
    canvas.width = 40;
    canvas.height = 40;
    let ctx = canvas.getContext('2d');
    drawMatrix(element.username, ctx, 4);
  });
}

function user_get(data) {
  html_ul = "";
  if (data.length == 0){
    html_ul = '<div style="height: 100px;width: 257px;"><p style="text-align: center;margin:38px">Такого пользователя нет :(</p></div>';
  }
  data.forEach((element) => {
    console.log(element);
    html_ul += '<div class="search_result_one" id_user="'+element.id+'" username="'+element.username+'">\
                  <canvas id="canvas_'+element.id+'_search"></canvas>\
                  <p class="favorite-nick">'+element.username+'</p>\
                </div>';
  });
  $(".search_result").html(html_ul);

  data.forEach((element) => {
    let canvas = document.getElementById('canvas_'+element.id+'_search');
    canvas.width = 40;
    canvas.height = 40;
    let ctx = canvas.getContext('2d');
    drawMatrix(element.username, ctx, 4);
  });
}
function chat_create(data) {
  console.log(data);
  d = faststep(BigInt(data.g), BigInt(parseInt(encrypt_key(localStorage.getItem('key')), 16)), BigInt(data.p));
  console.log(d);
  api_main("api/v1/chat/public_key", {key:d,chat:data.id},  function d(data) {});
}
function chat_nowork(data){
  data.forEach((element) => {
    console.log(element);
    console.log(BigInt(element.g));
    d = faststep(BigInt(element.g), BigInt(parseInt(encrypt_key(localStorage.getItem('key')), 16)), BigInt(element.p));
    console.log(d);
    api_main("api/v1/chat/public_key", {key:d,chat:element.id}, function d(data) {});
    public_key_token = -1;
    if (element.status == 2){
      public_key_token = element.public_key_user2;
    }
    if(element.status == 3){
      public_key_token = element.public_key_user1;
    }
    if (public_key_token != -1){
      token = faststep(BigInt(public_key_token), BigInt(parseInt(encrypt_key(localStorage.getItem('key')), 16)), BigInt(element.p)).toString();
      console.log("Token", token);
      token_encrypt = encrypt_text(token, encrypt_key(localStorage.getItem('key')));
      console.log("Token", token_encrypt);
      api_main("api/v1/token/create", {token:token_encrypt,chat:element.id}, function d(data) {});
    }
    console.log(element.public_key_user2 )
  });
}
function message_get(data){
  console.log(data);
  token = "";
  my_id = 0;
  my_username = "";
  token_decrypt = "";
  opponent_id = 0;
  day = 0;
  month = 0;
  opponent_id = 0;
  month_arr = {
    0:"января",
    1:"февраля",
    2:"марта",
    3:"апреля",
    4:"мая",
    5:"июня",
    6:"июля",
    7:"августа",
    8:"сентября",
    9:"октября",
    10:"ноября",
    11:"декабря"
  }
  html_msg = "";
  if (data.length == 0){
    $(".fl-messages").html('<div class="start_messager_div"><div class="start_messager_center"><canvas id="canvas_'+chat_id+'_start"></canvas><div class="button_around" user_id="'+$(this).attr("id_user")+'" style="background:transparent;color:#ffffff;font-weight:700;"><p class="start_messager_p">У вас нет сообщений в этой беседе:(\
                            <p style="margin:0";padding:0;>Напишите первым</p></p></div></div></div>');
    let canvas = document.getElementById('canvas_'+chat_id+'_start');
    canvas.width = 100;
    canvas.height = 100;
    let ctx = canvas.getContext('2d');
    drawMatrix(username, ctx, 10);
    
  }
  $(".messager_div_input").show();
  if (data.length == length_message_chat){
    if (izm > 0){
      my_id = data[0].myuser;
      my_username = data[0].username;
      opponent_id = data[0].opponent;
      izm -= 1;
      console.log("Opponent" + opponent_id);
      canvas_arr = document.getElementsByClassName('canvas_'+opponent_id+'_message');
      for (let canvas of canvas_arr) {
        canvas.width = 30;
        canvas.height = 30;
        let ctx = canvas.getContext('2d');
        drawMatrix(username, ctx, 3);
      }
    }
    return;
  }
  izm = 10;
  data.forEach((element) => {
    if (element.token != null){
      token = element.token;
      chat_token = token;
      token_decrypt =  decrypt_text(chat_token, encrypt_key(localStorage.getItem('key')));
      canvas_arr = document.getElementsByClassName('canvas_'+my_id+'_message');
      console.log(canvas_arr);
      my_id = element.myuser;
      my_username = element.username;
      opponent_id = element.opponent;
    }
    date = new Date(element.created_date);
    if (date.getMonth() != month || date.getDate() != day){
      html_msg += '<div data-id="qa-fl-messages-item-time" class="d-flex wrap justify-content-center mt-24 mb-16 text-9 date">'+date.getDate()+' '+month_arr[date.getMonth()]+'</div>';
      month = date.getMonth();
      day = date.getDate();
    }
    text = decrypt_text(element.text, encrypt_key(token_decrypt));
    if (my_id == element.user){
      html_msg += '<div data-id="qa-fl-messages-item-header" class="d-flex wrap fl-message-row align-items-end mb-10 flex-row-reverse owner">\
      <div><canvas class="canvas_'+element.user+'_message"></canvas></div>\
      <!---->\
      <div>\
          <div>\
              <div data-id="qa-fl-messages-item-text-message" class="fl-message-text text-7 mx-8 position-relative fl-message-text-owner">\
                  <!----><span data-id="qa-fl-messages-item-text-0"><span>'+text+'</span></span><!---->\
              </div>\
          </div>\
      </div>\
      <div data-id="qa-fl-messages-item-time-lt" class="message-time text-gray-dark text-10">\
      '+('0' + date.getHours()).slice(-2)+':'+('0' + date.getMinutes()).slice(-2)+'\
      </div>\
      </div>';
    }else{
      html_msg += '<div data-id="qa-fl-messages-item-header" class="d-flex wrap fl-message-row align-items-end mb-10">\
      <div><canvas class="canvas_'+element.user+'_message"></canvas></div>\
      <!---->\
      <div>\
          <div>\
              <div data-id="qa-fl-messages-item-text-message" class="fl-message-text text-7 mx-8 position-relative">\
                  <!----><span data-id="qa-fl-messages-item-text-0"><span>'+text+'</span></span><!---->\
              </div>\
          </div>\
      </div>\
      <div data-id="qa-fl-messages-item-time-lt" class="message-time text-gray-dark text-10">\
      '+('0' + date.getHours()).slice(-2)+':'+('0' + date.getMinutes()).slice(-2)+'\
      </div>\
      </div>';
    }

    
  });
  console.log(username);
  $(".fl-messages").html(html_msg);
  canvas_arr = document.getElementsByClassName('canvas_'+my_id+'_message');
  for (let canvas of canvas_arr) {
    canvas.width = 30;
    canvas.height = 30;
    let ctx = canvas.getContext('2d');
    drawMatrix(my_username, ctx, 3);
  }
  canvas_arr = document.getElementsByClassName('canvas_'+opponent_id+'_message');
  for (let canvas of canvas_arr) {
    canvas.width = 30;
    canvas.height = 30;
    let ctx = canvas.getContext('2d');
    drawMatrix(username, ctx, 3);
  }
  console.log(token);
  if (length_message_chat == 0){
    $(".fl-messages").scrollTop($(".fl-messages").prop('scrollHeight'));
  }
  length_message_chat = data.length;
}

function message(){
  token_decrypt =  decrypt_text(chat_token, encrypt_key(localStorage.getItem('key')));
  text = encrypt_text($("#message").val(), encrypt_key(token_decrypt));
  $("#message").val("");
  console.log(text);
  api_main("api/v1/message/create", {chat:chat_id,text:text}, function d(data) {});
  sleep(1);
  api_main("api/v1/message/get", {pk:chat_id}, message_get);
}
//alert(localStorage.getItem('auth'));

// setInterval(function(){
//   $.ajax({
//     type: "POST",
//     url: "api/v1/chat/get",
//     data: {

//     }
//   }).done(function( data ) {
//     html_ul = "";
//     data.forEach((element) => {
//       console.log(element);
//       html_ul += '<li class="favorite-li">\
//                       <a href="" class="favorite-a">\
//                           <canvas id="canvas_'+element.id+'"></canvas>\
//                           <p class="favorite-nick">'+element.username+'</p>\
//                       </a>\
//                   </li>';
//     });
//     $(".favorite_ul").html(html_ul);
//   });
// }, 5000); // 1000 м.сек
setInterval(function(){
  api_main("api/v1/chat/nowork/get", {}, chat_nowork);
  api_main("api/v1/message/get", {pk:chat_id}, message_get);
}, 1000); // 1000 м.сек





$("#search-focus").focus(function() {
  if ($( this ).val() != ""){
    console.log($( this ).val());
    api_main("api/v1/user/get", {username:$( this ).val(),}, user_get);
    $(".search_result").css("display","block");
  }else{
    $(".search_result").css("display","none");
  }
  $('#search-focus').bind('input',function() {
    console.log($( this ).val());
    if ($( this ).val() != ""){
      console.log($( this ).val());
      api_main("api/v1/user/get", {username:$( this ).val(),}, user_get);
      $(".search_result").css("display","block");
    }else{
      $(".search_result").css("display","none");
    }
  });
});

// $("#search-focus").blur(function() {
//   $(".search_result").css("display","none");
// });
$(document).mouseup(function (e){ // событие клика по веб-документу
  var div = $(".search-div"); // тут указываем ID элемента
  if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $(".search_result").hide(); // скрываем его
  }else{
    $(".search_result").on("click", ".search_result_one", function(event){
      console.log($(this).attr("id_user"));
      $(".fl-messages").html('<div class="start_messager_div"><div class="start_messager_center"><canvas id="canvas_'+$(this).attr("id_user")+'_start"></canvas><div class="button_around" user_id="'+$(this).attr("id_user")+'"><p class="start_messager_p">Начать диалог с пользователем '+$(this).attr("username")+'</p></div></div></div>');
      let canvas = document.getElementById('canvas_'+$(this).attr("id_user")+'_start');
      canvas.width = 100;
      canvas.height = 100;
      let ctx = canvas.getContext('2d');
      drawMatrix($(this).attr("username"), ctx, 10);
      $(".messager_div_input").hide();
      $("#search-focus").focus();
    
    });
    
  }
});
$(".fl-messages").on("click", ".button_around", function (event) {
  console.log($(this).attr("user_id"));
  api_main("api/v1/chat/create", {user:$(this).attr("user_id")}, chat_create);
  $(this).html('<p class="start_messager_p">Вы упешно отправили запрос</p>');
  $(this).css("background", "#028d93");
  $(this).css("color", "#ffffff");
  $(this).css("font-weight", "700");
});
$(".favorite_ul").on("click", ".favorite-a", function (event) {
  chat_id = $(this).attr("user_id");
  username = $(this).attr("username");
  console.log(chat_id);
  if ($(this).attr("user_id") == 4){
    api_main("api/v1/message/get", {pk:chat_id}, message_get);
    $(".messager_div_input").show();
  }else{
    $(".fl-messages").html('<div class="start_messager_div"><div class="start_messager_center"><canvas id="canvas_'+chat_id+'_start"></canvas><div class="button_around" user_id="'+$(this).attr("id_user")+'" style="background:#028d93;color:#ffffff;font-weight:700;"><p class="start_messager_p">Вы упешно отправили запрос</p></div></div></div>');
    let canvas = document.getElementById('canvas_'+chat_id+'_start');
    canvas.width = 100;
    canvas.height = 100;
    let ctx = canvas.getContext('2d');
    drawMatrix(username, ctx, 10);
    $(".messager_div_input").hide();
  }
  
});
$(".fl-messages").html('<div class="start_messager_div"><div class="start_messager_center"><canvas id="canvas_'+chat_id+'_start"></canvas><div class="button_around" user_id="'+$(this).attr("id_user")+'" style="background:transparent;color:#ffffff;font-weight:700;"><p class="start_messager_p">Добро пожаловать в анонимный чат</p></div></div></div>');
let canvas = document.getElementById('canvas_'+chat_id+'_start');
canvas.width = 100;
canvas.height = 100;
let ctx = canvas.getContext('2d');
drawMatrix(username, ctx, 10);

async function sha256(message){
    // encode as UTF-8
    const msgBuffer = new TextEncoder("utf-8").encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray
      .map(b => ("00" + b.toString(16)).slice(-2))
      .join("");
    return hashHex;
}



function drawMatrix(name, ctx, size) {
  
  let m = [
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0,0, 0, 0, 0, 0]
  ];
  let hash = CryptoJS.SHA256(name).toString().substr(0, m.length * m[0].length);
  
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      let n = parseInt(hash.substr(i * j + j, 1), 16);
      m[i][j] = n > 7 ? 0 : 1;

    }
  }
  // make symetric
  for (let i = 0; i < m.length; i++) {
    for (let j = Math.round(m[i].length / 2), k = 2; j < m[i].length; j++, k += 2) {
      m[i][j] = m[i][j - k];
    }
  }  
  let r = Math.floor(Math.random() * 128 + 128);
  let g = Math.floor(Math.random() * 128 + 128);
  let b = Math.floor(Math.random() * 128 + 128);
  // let r = 128;
  // let g = 128;
  // let b = 128;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
  
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (m[i][j] === 1) {
        ctx.fillRect(j * size+size/2, i * size, size, size);
      }
    }
  }
}
    
function faststep (val, step, mod) {
	s = BigInt("1"); v = step; c = val;
	while (v != BigInt("0")) {
		flag = BigInt("0");
		if (v%BigInt("2") == BigInt("1")) {
			if (!mod) 
				s = s*c;
			else
				s = (s*c) % mod;
			v = (v-BigInt("1"))/BigInt("2");
			if (!mod)
				c = c*c;
			else
				c = (c*c) % mod;
			flag = BigInt("1");
		}
		else {
			v = v/BigInt("2");
		}
		if (!flag) 
			if (!mod) 
				c = c*c;
			else
				c = (c*c) % mod;	
	}
	return s;
}

  
console.log(BigInt(parseInt(encrypt_key(localStorage.getItem('key')), 16)));