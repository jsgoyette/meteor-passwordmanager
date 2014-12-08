var saveNote = function(event, template) {

  var title = $('.note-title').val();
  var text = $('.note-content').text();
  if (!title || !text) return;

  var tags = _.filter(
    $('.note-tags').val().split(/\s+/),
    function (e) {
      return e;
    }
  );

  var note = {
    title: title,
    text: text,
    tags: tags,
    userid: Meteor.userId(),
    modified: Date.now(),
    deleted: false
  }

  var noteid = Notes.insert(note);
  Router.go('/notes/' + noteid);

};

Template.notesnew.helpers({

});

Template.notesnew.rendered = function () {
  if (Session.get('currentNote')) {
    Router.go('/notes/' + Session.get('currentNote'));
  }
};

Template.noteempty.events({

  'keydown .note-content': function (e) {

    // if enter
    if (e.keyCode == 13) {
      e.preventDefault();
      document.execCommand('insertHTML', false, "\n");
      return false;
    }

    // if tab
    if (e.keyCode == 9) {
      e.preventDefault();
      var el, range, html;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode( document.createTextNode('  ') );
        }
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = '  ';
      }
    }
  },

  'paste .note-content': function (e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    window.document.execCommand('insertHTML', false, text);
  },

  'click .note-save': saveNote,
  'change .note-title': saveNote,
  'change .note-tags': saveNote,
  'focusout .note-content': saveNote,

});

