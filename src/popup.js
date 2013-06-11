restore_options();
var btn = document.getElementById("save_btn");
var btn_listener = function(e){
    save_options();
};
btn.addEventListener('click', btn_listener, false);

function save_options() {
  var move_enabled = document.getElementById("move_enabled");
  var move_enabled = move_enabled.checked == true ? 1 : 0;
  var max_spawn = document.getElementById("max_spawn").value;
  var data = {
    bunbun : {
      move_enabled : move_enabled,
      max_spawn    : max_spawn ? max_spawn : 20
    },
  };

  chrome.storage.local.set(data, function(){
    var status = document.getElementById("status");
    status.innerHTML = "Settings saved!!";
    setTimeout(function() {
      status.innerHTML = "";
    }, 750);
  });
}

function restore_options() {
  document.getElementById("max_spawn").value = 20;
  var move_enabled = document.getElementById("move_enabled");
  move_enabled.checked = false;
  chrome.storage.local.get('bunbun', function(result){
    var s_move_enabled = result.bunbun.move_enabled;
    move_enabled.checked = s_move_enabled == 1 ? true : false;

    var s_max_spawn = result.bunbun.max_spawn;
    if( s_max_spawn ) {
      document.getElementById("max_spawn").value = s_max_spawn;
    }
  });
}
