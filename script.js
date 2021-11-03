const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []
getData()
filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')
    const {results} = await res.json()
    result.innerHTML = ''
    results.forEach(user => {
        const li = document.createElement('li')
        listItems.push(li)
        li.innerHTML = `  
       <img src="${user.picture.large}" alt="${user.name.first}">  
       <div class="user-info">  
         <h4>${user.name.first} ${user.name.last}</h4>  
         <p>${user.location.city}, ${user.location.country}</p>  
       </div>  
     `
        result.appendChild(li)
    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}

// $('#menu-icons').click(function(){
//     $(this).toggleClass("click");
// });

/*AHK */
$('.chat-header .header-menu .menu-ico').click(function(){
    $('.chat-header .header-menu ul.list').slideToggle('fast');
});

$(document).click(function(){
    $(".chat-header .header-menu ul.list").slideUp('fast');
});

$(".chat-header .header-menu ul.list,.chat-header .header-menu .menu-ico").click(function(e){
    e.stopPropagation();
});

$('.chat-inp .emoji').click(function(){
    $('.emoji-dashboard').slideToggle('fast');
});

$(document).click(function(){
    $(".emoji-dashboard").slideUp('fast');
});

$(".chat-header .header-menu ul.list,.chat-inp .emoji").click(function(e){
    e.stopPropagation();
});

$('.emoji-dashboard li .em').click(function(){
    var emo = $(this).css('background-image').split('"')[1];
    $('.chat-inp .input').find('div').remove();
    $('.chat-inp .input').append('<img src="'+emo+'">');
    $(".emoji-dashboard").slideUp('fast');

});

$('.chat-inp .opts .send').click(function(){
    var val = $('.chat-inp .input').html();
    if (val.length > 0){
        $('.chat-body .chats-text-cont').append('<p class="chat-text"><span>'+val+'</span></p>')
    }
    $('.chat-inp .input').html('');
    $('.chats-text-cont div').remove();
});

$('input,.input').each(function(){
    tmpval = $(this).text().length;
    if(tmpval != '') {
        $(this).prev().addClass('trans');
        $(this).parent().addClass('lined');
    }
});
$('input,.input').focus(function() {
    $(this).prev().addClass('trans');
    $(this).parent().addClass('lined');
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('.chat-inp .opts .send').click();
        }
    });
}).blur(function() {
    if ($(this).text().length == ''){
        $(this).prev().removeClass('trans');
        $(this).parent().removeClass('lined');
    }
});