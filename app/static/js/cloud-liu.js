function CloudLiu(el) {
  this.el = el;
  this.active = true;
  this.candidates = Array();
  this.keyStrokes = Array();
  this.ui = $('.cloud-liu-outer');
  this.ui.preedit = $('.cloud-liu-preedit')
  this.ui.candidates = $('.cloud-liu-candidates')

  this.ui.draggable();
}

CloudLiu.prototype.doQuery = function() {
  var liu = this;
  if (this.keyStrokes.length) {
    $.post('/query.json', {
      keyStrokes: this.keyStrokes
    }, function(data, textStatus) {
      liu.candidates = data.candidates;
      liu.updateCandidates();
      console.log(data.candidates);
    });
  } else {
    liu.candidates = [];
  }
}

CloudLiu.prototype.handle_Key = function(key) {
  switch (key) {
  case 8:
    return this.handle_Backspace();
  case 13:
    return this.handle_Enter();
  case 32:
    this.handle_Space();
    return true;
  default:
    if ((key >= 65 && key <= 90) || key == 190 || key == 188
        || key == 222 || key == 219 || key == 221) {
      this.handle_Default(key);
      return true;
    }
  }
  return false;
}

CloudLiu.prototype.handle_Backspace = function () {
  if (this.keyStrokes.length) {
    this.keyStrokes.pop();
    this.doQuery();
    this.updatePreEdit();
    this.updateCandidates();
    return true;
  }
  return false;
}

CloudLiu.prototype.handle_Default = function (key) {
  if (this.keyStrokes.length < 5) {
    this.keyStrokes.push(key);
    this.doQuery();
    this.updatePreEdit();
    console.log(this.keyStrokes);
  }
}

CloudLiu.prototype.handle_Space = function () {
  this.el.textrange('replace', this.candidates[0]);
  this.el.textrange('setcursor', this.el.textrange('get').end);
  this.keyStrokes = [];
  this.candidates = [];
  this.updatePreEdit();
  this.updateCandidates();
}

CloudLiu.prototype.handle_Enter = function() {
  if (this.keyStrokes.length) {
    this.handle_Space();
    return true;
  }
  return false;
}

CloudLiu.prototype.updatePreEdit = function() {
  this.ui.preedit.text(
      this.keyStrokes.map(function(v) {
        return String.fromCharCode(v);
      }).join(""));
}

CloudLiu.prototype.updateCandidates = function() {
  this.ui.candidates.empty();
  this.ui.candidates.append(this.candidates.map(function(v) {
    return '<div class="cloud-liu-candidate">' + v + '</div>';
  }));
}

$(document).ready(function() {
  var $textarea = $('textarea');
  var cl = new CloudLiu($textarea);

  $textarea.keydown(function(e) {
    if (e.ctrlKey) {
      return;
    }
    if (cl.handle_Key(e.keyCode)) {
      e.preventDefault();
    }
  });

  var $input = $('input[type="text"]');
  var cl2 = new CloudLiu($input);
  $input.keydown(function(e) {
    if (e.ctrlKey) {
      return;
    }
    if (cl2.handle_Key(e.keyCode)) {
      e.preventDefault();
    }
  });
});
