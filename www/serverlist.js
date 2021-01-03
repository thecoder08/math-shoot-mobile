function addServer() {
  var servers = {};
  if (localStorage.getItem('servers')) {
    servers = JSON.parse(localStorage.getItem('servers'));
  }
  servers[prompt('Server Name:')] = prompt('Server Address:');
  localStorage.setItem('servers', JSON.stringify(servers));
}
setInterval(function() {
  $('#servers').innerHTML = '';
  for (var prop in JSON.parse(localStorage.getItem('servers'))) {
    var serverElement = '<p style="border: 1px solid black;">';
    serverElement += prop + ' <span id="' + prop + '-players"></span><br>'
    serverElement += '<button onclick="joinServer(\'' + prop + '\');">Join Server</button><button onclick="deleteServer(\'' + prop + '\');">Delete Server</button><br>'
    serverElement += '<img width="50px" alt="Server Icon" src="http://' + JSON.parse(localStorage.getItem('servers'))[prop] + '/icon"> ';
    serverElement += '<span id="' + prop + '-motd"><span style="color: red;">Could not connect to server!</span></span>';
    serverElement += '</p>'
    $('#servers').innerHTML += serverElement;
    request('http://' + JSON.parse(localStorage.getItem('servers'))[prop] + '/motd', function(data) {
      $('#' + prop + '-motd').innerHTML = data;
    });
    request('http://' + JSON.parse(localStorage.getItem('servers'))[prop] + '/players', function(data) {
      $('#' + prop + '-players').innerHTML = data;
    });
  }
}, 3000);
function deleteServer(name) {
  var servers = JSON.parse(localStorage.getItem('servers'));
  delete servers[name];
  localStorage.setItem('servers', JSON.stringify(servers));
}
function directConnect() {
  document.location.href = 'game.html?name=' + $('#name').value + '&skin=' + $('#skin').value + '&address=' + $('#directaddress').value;
}
function joinServer(server) {
  var servers = JSON.parse(localStorage.getItem('servers'));
  document.location.href = 'game.html?name=' + $('#name').value + '&skin=' + $('#skin').value + '&address=' + servers[server];
}
