var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter((params) => {
    params.url = baseURL + params.url
})