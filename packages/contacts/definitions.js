CollectionSchema = {
  name: {
    type: String,
    label: 'Name',
    autoValue: function () {
      var firstname = this.field('firstname');
      var lastname = this.field('lastname');
      return firstname.value + ' ' + lastname.value;
    }
  },
  firstname: {
    type: String,
    label: 'First Name',
    max: 200
  },
  lastname: {
    type: String,
    label: 'Last Name',
  },
  phone_work: {
    type: String,
    label: 'Work Phone',
    optional: true
  },
  phone_home: {
    type: String,
    label: 'Home Phone',
    optional: true
  },
  address: {
    type: Object,
    minCount: 1,
    maxCount: 4
  },
  'address.street': {
    label: 'Address Street',
    type: String
  },
  'address.city': {
    label: 'Address City',
    type: String
  },
  notes: {
    type: String,
    label: 'Notes',
    optional: true,
    autoform: {
      rows: 9,
    }
  },
  deleted: {
    type: Boolean,
    defaultValue: false,
  },
};

LayoutDefinitions = {
  list: {
    fields: [
      'lastname', 'firstname', 'phone_work', 'phone_home', 'address.street', 'address.city',
    ],
    defaultOptions: {
      sort: {'lastname': 1, 'firstname': 1},
      // limit: 10
    },
  },
  record: {
    fields: [
      'firstname', 'lastname', 'phone_work', 'phone_home', 'address', 'notes'
    ],
    // rows: [
    //   [
    //     {
    //       name: 'firstname',
    //       className: 'col-sm-6'
    //     },
    //     {
    //       name: 'lastname',
    //       className: 'col-sm-6'
    //     }
    //   ],
    //   [
    //     {
    //       name: 'phone_work',
    //       className: 'col-sm-6'
    //     },
    //     {
    //       name: 'phone_home',
    //       className: 'col-sm-6'
    //     }
    //   ],
    //   [
    //     {
    //       name: 'address',
    //       className: 'col-sm-6'
    //     },
    //     {
    //       name: 'notes',
    //       className: 'col-sm-6'
    //     },
    //   ]
    // ]
  }
}