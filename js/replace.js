function replaceHost(url) {
  var reg = /^http:\/\/.*?\//;

  return url.replace(reg, function (v) {
    return "http://localhost:9090/";
  });
}


function myUrl(url, index) {
  return url.replace(/pn=.*?&/, (x) => {
      return `pn=${index}&`
  } )
}