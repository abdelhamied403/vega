$(() => {
    $.post({
        url: `https://api.instagram.com/oauth/authorize
?client_id=1478503885835151
&redirect_uri=https://vega-f7e42.web.app/
&scope=user_profile,user_media
&response_type=code`,
        success: function (res) {
            console.log('success', res)
        },
        error: function(error) {
            console.log('error', error);
        }
    })
});

// {
//     "client_id": "1478503885835151",
//     "client_secret": "978c9776c0857e564cd67af04cf23e81",
//     "grant_type": "authorization_code",
//     "redirect_uri": "https://vega-f7e42.web.app",
//     "code":""
// }


// {
//     "access_token": "IGQVJWS1lUU1FiLV9FSGpsTFlmSHZANSzZAOeUUwc3g2b0QyazJ3eDBvbkxLZA3dvZAmhxUW1xbTFfbDlTaXdDRkZANX2dRMDB0ZAGpNYXFqcDdoR3BsbEM0U1N6VVhhOTRVc1liR0ZA5bXdFT1RtX0NpRFI2VmRuUkQwZAzlKSlBv",
//     "user_id": 17841448624392369
// }