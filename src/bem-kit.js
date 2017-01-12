/*! AwesomeBemCSS by Irfan Maulana*/

/*
DROPDOWN
*/
var initDropdown = (function(){
    var item = $('.button--dropdown');
    item.on('click', function(){
        var target = $(this).find('.button__menu');
        $(target).stop(true, true).delay(50).slideToggle(200);
    });

    item.hover(function(){
        $(this).stop(true, true);
    }, function(){
        var target = $(this).find('.button__menu');
        $(target).stop(true, true).delay(1000).slideUp(200);
    });

    var menu = $('.button__menu');
    menu.hover(function(){
        $(this).stop(true, true);
    }, function(){
        $(this).stop(true, true).delay(1000).slideUp(200);
    });

})();

/*
TABS
*/
function setActiveTab(target){
    var tabsActive = $(".tabs").find("[data-target='" + target + "']");

    $.each(tabsActive, function(i, el){
        if($(el).hasClass('tabs__item')){
            $(el).siblings().removeClass('tabs__item--active');
            $(el).addClass('tabs__item--active');
        }else if($(el).hasClass('tabs__itemv')){
            $(el).siblings().removeClass('tabs__itemv--active');
            $(el).addClass('tabs__itemv--active');
        }        
    }); 
    
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
}

function initTab(tabClass, tabActiveClass, otherTabActiveClass){
    var itemv = $('.' + tabClass);
    itemv.on('click', function(){
        var target = $(this).attr('data-target');
        setActiveTab(target);

        window.location.hash = target;
        return false;
    });
}

var initTabsEvent = (function(){

    initTab('tabs__item', 'tabs__item--active', 
            'tabs__itemv--active');

    initTab('tabs__itemv', 'tabs__itemv--active', 
            'tabs__item--active');

    var urlHash = window.location.hash;
    if (urlHash !== "") {
        setActiveTab(urlHash);
    }
})();

/*
ALERT
*/
var initAlertClose = (function(){
    var item = $('.alert__close');
    item.on('click', function(){
        $(this).parent().hide();
        return false;
    });
})();

/*
SORT TABLE
*/
var initTableSort = (function(){
    var item = $('.table__sort--asc, .table__sort--desc');
    item.on('click', function(){
        var sortable = $(this).attr('sortable');
        if(sortable && sortable === 'true'){
            $(this).toggleClass('table__sort--asc table__sort--desc'); 
        }               
        return false;
    });
})();

/*
PAGINATION
*/
var initPagination = (function(){
    var item = $('.pager__page');
    item.on('click', function(){
        var allPager = $(this).parent().siblings().find('.pager__page');
        $(allPager).removeClass('pager__page--active');
        
        $(this).addClass('pager__page--active');

        return false;
    });
})();

/*
MODAL
*/
var initModal = (function(){

    var triggerBtn = $('[data-show=modal]').click(function(event){
        var modalId = $(this).attr('data-target');        
        $('#' + modalId).show();
    });

    $('.modal__close').click(function(event){        
        $(this).parents('.modal').hide();
    });

    $(window).click(function(event){
        if (event.target.className === 'modal') {
            $(event.target).hide();
        }
    });

})();

function modalShow(elementId){
    $('#' + modalId).show();
}

function modalHide(elementId){
    $('#' + modalId).hide();
}

$(document).ready(function () {
	'use strict';   

    initDropdown;
	initTabsEvent;
    initAlertClose;
    initTableSort;
    initPagination;
    initModal;

});

$(window).load(function(){
    'use strict';    
});