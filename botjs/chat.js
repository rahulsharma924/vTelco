/* code for popup hide-show
$(function(){
$("#addClass").click(function () {
          $('#qnimate').addClass('popup-box-on');
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  })
*/
/*$( document ).load(function() {
    $( '#chat-msg-board' ).hide();
    $('.chat-popup .panel-footer').hide();
});
*/


/* Virtual Assistant Collapse Minimise/Maximize event.*/
var messageError = "I couldn't understand, could you please try again?";

$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
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
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});

/* Handle Enter Key Event */
$(function() {
$('#btn-input').keypress(function(event) {
    if (event.keyCode == 13) {
       // alert("enter");
    $('#btn-chat').click();
    }
})
})
/* Submit button Event */
$(document).on('click', '#btn-chat', function (e) {
    var msg = $( "#btn-input" ).val();
    if(msg != ""){
   	 send();
     return;
    }    
});

$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( ".panel-footer input.chat_input" ).trigger( "focus" );
    $( "#chat_window_1" ).hide();
    if($('#minim_chat_window').hasClass('glyphicon-plus'))
    {
     $this= $('.panel-heading span.icon_minim');

     $this.parents('.panel').find('.panel-body').slideDown();
     $this.removeClass('panel-collapsed');
     $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
     $('.chat-popup .panel-footer').show();
    }    
    $( "#chatTogglerDiv" ).css({ opacity: 1 });

});

$(document).on('click', '#chatTogglerDiv', function (e) {
    $("#chat_window_1" ).show();
    $( "#chatTogglerDiv" ).css({ opacity: 0 })
    /*if ($('#minim_chat_window').hasClass('panel-collapsed')) {
       // $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    }*/
    //$( ".panel-heading span.icon_minim" ).trigger( "click" );
});


function send() {
       var text = $( "#btn-input" ).val();
    //  alert("munish");
       chatBotAppend(text,"user");
 	   $( "#btn-input" ).val("");
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://www.intelliverse.co.in/AEMIntegration/rest/WebsiteListener",
          "method": "GET",
          "headers": {
            "cache-control": "no-cache",
          },
          "data": {
            "message": text,
            "chatUserId": "12345",
            "source": "AEM",
            "responseType": "richText"
          }
      }

        $.ajax(settings).done(function (response) {   
                    //alert("success");
                    if (response.message.hasOwnProperty('attachment') ) {
                      if(response.message.attachment.payload.template_type=='button'){
                        // alert(objMultiImage.message.attachment.payload.elements[i].image_url); 
                       //alert(response.message.attachment.payload.buttons[0].title);
                        // chatBotAppend("bot response","bot","attachment-generic",objMultiImage.message); 
                        chatBotAppend("bot response","bot","attachment",response.message);
                        }else{
						//alert("hi");
						 chatBotAppend("bot response","bot","attachment-generic",response.message);

                        }       
                     //chatBotAppend(response);
                    }if(response.message.hasOwnProperty('text')){
                         //alert('text');
                        chatBotAppend("bot response","bot","text",response.message);
                            }
                  //chatBotAppend("bot response","bot");
                  //console.log(response);
        });

       $.ajax(settings).fail(function (response) {   
          //  alert("error");
            chatBotAppend("bot response","bot","error",messageError);

        });


	}


 function chatBotAppend(text,user,type,message)
 {
      if(user=="user"){
        //  alert("text");
        $("#chat-msg-board").append("<div class='row msg_container base_sent'><div class='col-md-10 col-xs-10'><div class='messages msg_sent'><p>"+text+"</p></div></div><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/img.jpg' class='img-responsive '></div> </div>");

      }

      if(user=="bot" && type=="error"){
        $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'><p>"+message+"</p></div></div> </div>");
      }  

      if(user=="bot" && type=="text"){
        $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'><p>"+message.text+"</p></div></div> </div>");
      }


      if(user=="bot" && type=="attachment-generic"){
         // alert("hi");
          	/*	var elementsBody='';
       			 for (var i = 0; i < message.attachment.payload.elements.length; i++) {
                    elementsBody += "<div class='image-carousal'><img src="+message.attachment.payload.elements[i].image_url+">"+message.attachment.payload.elements[i].title+"<br/>"+message.attachment.payload.elements[i].subtitle+"<br/>";
                    for (var j = 0; j < message.attachment.payload.elements[i].buttons.length; j++) {
                    elementsBody += "<p class='text-center'><a href="+message.attachment.payload.elements[i].buttons[j].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value="+message.attachment.payload.elements[i].buttons[j].title+"></a></p>";
					}
					elementsBody += "</div>";
                }*/
         $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'>Here are suggestions for you</div></div> </div>");

          		 var k= 1 + Math.floor(Math.random() * 100000000);
                 var active='';
  				 var elementsBody="<div id='myCarousel"+k+"' class='carousel slide' data-ride='carousel'><div class='carousel-inner' role='listbox'>";
                 //alert(elementsBody);
                    for (var i = 0; i < message.attachment.payload.elements.length; i++) {
                        //alert(i);
                        if(i==0){ 
                         	active=' active';
                         }
                         else{
                        	 active='';
                         } 
                        elementsBody += "<div class='item"+active+"'><img src="+message.attachment.payload.elements[i].image_url+"><div class='carousel-title'><p><strong>"+message.attachment.payload.elements[i].title+"</strong></p><p>"+message.attachment.payload.elements[i].subtitle+"</p></div>";
                        for (var j = 0; j < message.attachment.payload.elements[i].buttons.length; j++) {
                        elementsBody += "<hr class='small_gap'/><span class='btnInline'><a href="+message.attachment.payload.elements[i].buttons[j].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value="+message.attachment.payload.elements[i].buttons[j].title+"></a></span>";
                        }
                        if(message.attachment.payload.elements[i].hasOwnProperty('form') ){
						elementsBody +="<div class='text-center'>"+message.attachment.payload.elements[i].form+"</div>";
                        }
                        elementsBody += "</div>";
                    }
   				 elementsBody +="</div><a class='left carousel-control' href='#myCarousel"+k+"' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a><a class='right carousel-control' href='#myCarousel"+k+"' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>";



         $("#chat-msg-board").append(elementsBody);
        }  


      if(user=="bot" && type=="attachment"){
          		var btnBody='<hr/>';
       			 for (var i = 0; i < message.attachment.payload.buttons.length; i++) {
                    btnBody += "<div class='text-center'><a href="+message.attachment.payload.buttons[i].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value='Click here to view'></a></div>";
                }

         $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'><p>"+message.attachment.payload.text+"</p>"+btnBody+"</div></div> </div>");
        }  


   sessionStorage.setItem( 'chat-storage', $("#chat-msg-board").html()  );
  // alert(localStorage.getItem( 'chat-storage' ));  
   $('#chat-msg-board').animate({scrollTop: $('#chat-msg-board').prop("scrollHeight")}, 500);  


   //  localStorage.setItem( 'chat-discussion', JSON.stringify(car)  );
//console.log( car );
//console.log(JSON.parse(localStorage.getItem( 'car' )).doors );

     /*var chatMsg=$('#chat-msg-board').html();

     $.session.set('chat-session',chatMsg );
     alert(chatMsg);
      alert(session);
     alert($.session.get('chat-session'));*/

 }  