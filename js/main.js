$(function(){
  var app = {};
  login=0;
  app = {
    init: function(){
        $('body').on('change', '.checkboxed input', function(){
            if($(this).attr('type') == 'checkbox')
              app.checkboxed(this);
            else
              app.radioed(this);
        });
        $('select.selectized').selectize({
            valueField: 'name',
            labelField: 'name',
            searchField: ['name']
        });
        
        $('.auth-btn-ent').on('click',function(){
          $.post("home?check", { ans:'ajax',ent: "1", email: $('#auth-email').val(), pass: $('#auth-pass').val()})
          .done(function( data ) {
            if (data==1) {
              $('#fetcher-auth').submit();
            } else {
              $('#auth-email').css('border-color','red');
              $('#auth-pass').css('border-color','red');
              
              $('.modal-content').animate({left:'20px'},100);
              $('.modal-content').animate({left:'-20px'},100);
              $('.modal-content').animate({left:'20px'},100);
              $('.modal-content').animate({left:'-20px'},100);
              $('.modal-content').animate({left:'0px'},100);
            }
          });
          return false;
        });
        $('.auth-to-reg').on('click',function(){
          $('#auth-email').css('border-color','');
          $('#auth-pass').css('border-color','');
          $('.fetch-ent').hide();
          $('.fetch-reg').show();
        });
        $('.auth-to-ent').on('click',function(){
          $('#auth-email').css('border-color','');
          $('#auth-pass').css('border-color','');
          $('.fetch-ent').show();
          $('.fetch-reg').hide();
        });

        $('.auth-btn-reg').on('click',function(){
          if ($('#auth-pass').val()!=$('#auth-pass2').val()) {
            $('#auth-pass').css('border-color','red');
            $('#auth-pass2').css('border-color','red');
            return false;
          }
          $.post("home?check", { ans:'ajax',reg: "1", email: $('#auth-email').val(), pass: $('#auth-pass').val(),pass2: $('#auth-pass2').val()})
          .done(function( data ) {
            if (data==1) {
              $('.fetch-reg2').show();
              $('.fetch-ent2').hide();
            } else {
              $('#auth-email').css('border-color','red');
            }
          });
          
          return false;
        });
        
        
    },
    checkboxed: function(el){
        $(el).parent().removeClass('checked');
        if($(el).is(':checked')){
          $(el).parent().addClass('checked');
        }
    },
    radioed: function(el){
      var name = $(el).attr('name');
      $('input[name='+ name +']').parent().removeClass('checked');
      if($(el).is(':checked')){
        $(el).parent().addClass('checked');
      }
    },
    accordionHeadingClass: function(){
      $('#acc-func').on('hide.bs.collapse', function (e) {
          $(e.target).prev().removeClass('active');
      }).on('show.bs.collapse', function (e) {
          $(e.target).prev().addClass('active');
      });
    }
  }
  app.init();
});
