(function($){
var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

$(document).on('click', '#chatTogglerDiv', function (e) {
    $(".chat" ).css({ display: 'flex' })
    $( "#chatTogglerDiv" ).css({ opacity: 0 })

});

$(document).on('click', '#open-close', function (e) {
    var $this = $(this);
	//    height: 26vh;

    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        $('.chat-popup .panel-footer').hide();
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
         $('.chat-popup .panel-footer').show();
    }
});

$(document).on('click', '#icon-close', function (e) {
    $( ".chat" ).hide();    
    $( "#chatTogglerDiv" ).css({ opacity: 1 });
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    //serverMessage("hello i am customer support bot type hi and i will show you quick buttions");
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
   fetchmsg() 
  
  $('.message-input').val(null);
   // sessionStorage.setItem( 'chat-storage', $("#mCSB_1").html()  );
   //alert(localStorage.getItem( 'chat-storage' ));
  //updateScrollbar();
   
  // $('.message-input').animate({scrollTop: $('#chat-msg-board').prop("scrollHeight")}, 500);  
}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  
  //serverMessage("hello");
  //speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="botcss/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="botcss/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
	 sessionStorage.setItem( 'chat-storage', $(".mCSB_container").html()  );
   //alert(localStorage.getItem( 'chat-storage' ));
  //updateScrollbar();
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

  

}


function fetchmsg(){

    // var url = 'https://chatbot.devcap1.hclets.com/send-msg';
	 var url = 'http://localhost:5000/send-msg';

      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
		  data.append("TESTID", "D:\softwares\tomcat\chatbot\key\myfinanceapp-xsgg-d9e289870cf1.json");
          console.log(pair)
      }
    
      console.log("abc",data)
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
          serverMessage(response.Reply);
		  //voice js
          //speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
        
          
         })
          .catch(error => console.error('Error h:', error));

}


})(jQuery);