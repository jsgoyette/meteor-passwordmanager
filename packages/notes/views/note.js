var saveNote = function() {

  var text = $('.note-content').text();

  var tags = _.filter(
    $('.note-tags').val().split(/\s+/),
    function (e) {
      return e;
    }
  );

  var note = {
    title: $('.note-title').val(),
    text: text,
    tags: tags,
    userid: Meteor.userId(),
    modified: Date.now(),
  }

  Notes.update(this._id, {
    $set: note
  });

  Session.set('currentNote', this._id);
};

Template.note.helpers({

});

Template.note.rendered = function () {
  Session.set('currentNote', this.data._id);
}

Template.notes.helpers({

});

Template.notes.events({

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

    var all = $('.note-content').text()
      .replace(/<div>/g, '')
      .replace(/<\/div>/g, '')
      .replace(/<br>/g, "\n")
      .replace(/\&nbsp;/g, " ");

    $('.note-content').html('');

    Notes.update({ _id: this._id }, { $set: { text: all } });

  },

  'click .note-save': function() {
    _.bind(saveNote, this).call();
  },
  'change .note-title': function() {
    _.bind(saveNote, this).call();
  },
  'change .note-tags': function() {
    _.bind(saveNote, this).call();
  },
  'focusout .note-content': function() {
    _.bind(saveNote, this).call();
  },

});

