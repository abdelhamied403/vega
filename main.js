$(() => {
    localization();
    selectOnInputFocus();
    urlChanged();
    scrollEvent();
    navigate();
});

let languages = {
    en: 'en',
    ar: 'ar',
};
let dir = {
    en: 'ltr',
    ar: 'rtl'
};
let currentLang = localStorage.getItem("lang") || languages.en;

function removeHash () { 
    history.pushState("", document.title, window.location.pathname + window.location.search);                                     
}
function navigate() {
    const slug = document.location.hash;
    if (!slug) return;
    $('html, body').animate({scrollTop: $(slug).offset().top -150 }, 'slow');
    removeHash();
}

function localization() {
    $('html').attr("dir", dir[currentLang]);
    $("*[rel*=localize]").localize("application", { language: currentLang })
}
function selectOnInputFocus () {
    var focusedElement;
    $(document).on('focus', 'input', function () {
        if (focusedElement == this) return; //already focused, return so user can now place cursor at specific point in input.
        focusedElement = this;
        setTimeout(function () { focusedElement.select(); }, 100); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
    });
}

function urlChanged() {
    console.log('init')
    $(window).on('hashchange', function(){
        navigate();
    });
}

function scrollEvent() {
    $(window).on( 'scroll', function(){
        const y = window.scrollY;
        if(y > 100) {
            $('.navbar').addClass("solid");
        } else {
            $('.navbar').removeClass("solid");
        }
     });
}


function toggleLang() {
    const lang = currentLang === languages.en ? languages.ar : languages.en;
    localStorage.setItem('lang', lang);
    location.reload();
}