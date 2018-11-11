function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath  //setCookie('email', qqemail, 360, 'path=/');
}
function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}
//UPDATE THE FOLLOWING 5 PARAMETERS USING YOUR OWN ACCOUNT INFORMATION
var mandrill_api_key = 'xxxxxxxxxxxx'; // Mandrill API key
var sender_email = 'xxxxxxxxxxxxxxxxxx'; // patients sees this email address as the sender

var twilio_id = 'xxxxxxxxxxxxxxxxxxxxxx';// Twilio AccountSID
var twilio_auth = 'xxxxxxxxxxxxxxxxxxxx';// Twilio Auth Token
var twilio_number = 'xxxxxxxxxxxxxxxxxxxxx';// Twilio phone number

setCookie('ctwilio_id', twilio_id, 360, 'path=/');
setCookie('ctwilio_auth', twilio_auth, 360, 'path=/');
setCookie('ctwilio_number', twilio_number, 360, 'path=/');

//THE GETTER METHODS SHOULDN'T NEED CHANGING
function get_mandrill_api_key() {
  return mandrill_api_key;
}
function get_sender_email() {
  return sender_email;
}
function get_twilio_id() {
  return twilio_id;
}
function get_twilio_auth() {
  return twilio_auth;
}
function get_twilio_number() {
  return twilio_number;
}
