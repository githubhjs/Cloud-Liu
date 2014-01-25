var host = '__HOST__';

function CloudLiu_UI_init() {
  var ui = $('<div class="cloud-liu-outer"><div class="cloud-liu-preedit"></div><div class="cloud-liu-candidates">載入中 ...</div></div>');
  $('body').append(ui);
  ui.draggable();
}

function CloudLiu_Core_init() {
  window.db == undefined;
  var $disp = $('.cloud-liu-candidates');
  var raw = atob(db_data.value);
  var array = new Int8Array(raw.length);
  for (var i = 0; i < raw.length; ++i) {
    array[i] = raw.charCodeAt(i);
  }
  window.db = SQL.open(array);
  $disp.text("等待輸入");
}

requirejs.config({
  baseUrl: host + '/static/js',
  waitSeconds: 120
});

require([
    'jquery-1.10.2.min',
    'jquery-ui-1.10.4.custom.min',
    'jquery-textrange.min'
  ], function() {
  console.log('Cloud Liu loaindg phase 1 ...');
  CloudLiu_UI_init();

  require([
    'sql.min',
    'boshiamy.db'
    ], function() {
    console.log('Cloud Liu loaindg phase 2 ...');
    require(['cloud-liu.min'], function() {
      CloudLiu_Core_init();
      console.log('Cloud Liu loaded');

      $('textarea').each(function(idx, el) {
        new CloudLiu(el);
      });

      $('input[type="text"]').each(function(idx, el) {
        new CloudLiu(el);
      });
    });
  });
});