var getQueryParams = function() {
  var vars = {},
      href = window.location.href,
      hashes, hash;

  if (href.indexOf('?') == -1)
    return vars;

  hashes = href.slice(
    href.indexOf('?') + 1,
    (href.indexOf('#') != -1 ? href.indexOf('#') : href.length)
  ).split('&');
  for (var i = 0, chunk; (chunk = hashes[i]); i++) {
    hash = chunk.split('=');
    if (!hash[0] && !hash[1]) {
      return;
    }

    vars[decodeURIComponent(hash[0])] = (hash[1] ? decodeURIComponent(hash[1]).replace(/\+/, ' ') : '');
  }

  return vars;
};

var parseLinkHeader = function(header) {
  if (header === null) {
    return {};
  }

  var header_vals = header.split(','),
      links = {};

  header_vals.forEach(function(val){
    var match = /<([^>]+)>; rel="([^"]+)"(?:; results="([^"]+)")?/g.exec(val);
    var hasResults = (match[3] === 'true' ? true : (match[3] === 'false' ? false : null));

    links[match[2]] = {
      href: match[1],
      results: hasResults
    };
  });

  return links;
};

module.exports = {
  getQueryParams: getQueryParams,
  parseLinkHeader: parseLinkHeader
};
