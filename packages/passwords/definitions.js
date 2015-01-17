CollectionSchema = {
  nickname: {
    type: String,
    label: 'Nickname',
    max: 200
  },
  url: {
    type: String,
    label: 'URL',
    optional: true
  },
  username: {
    type: String,
    label: 'Username',
    optional: true
  },
  password: {
    type: String,
    label: 'Password',
    optional: true
  },
  notes: {
    type: String,
    label: 'Notes',
    optional: true
  },
  deleted: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  userid: {
    type: String,
    autoValue: function() { return this.userId }
  },
};

ListLayout = {
  fields: [ 'nickname' ],
  defaultOptions: {
    sort: { 'nickname': 1 }
  }
};

RecordLayout: {
  rows: [
    {

    }
  ]
};