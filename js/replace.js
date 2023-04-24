function replaceHost(url) {
  var reg = /^http:\/\/.*?\//;

  return url.replace(reg, function (v) {
    return "http://localhost:9090/";
  });
}

