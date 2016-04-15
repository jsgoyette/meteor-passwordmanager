import { Template } from 'meteor/templating';
import { Layouts } from 'meteor/jsgoyette:layouts';
import { ListLayout } from '../layouts.js';
import { Passwords } from '../collections.js';
import { PasswordsSchema } from '../schema.js';

Template.passwordlist.helpers({

  listData() {

    const labels = _.object(
      _.keys(PasswordsSchema),
      _.pluck(PasswordsSchema, 'label')
    );

    return {
      labels,
      key: 'passwords',
      collection: Passwords,
      fields: ListLayout.fields,
      controller: Layouts.Controllers.list({
        key: 'passwords',
        options: ListLayout.defaultOptions
      })
    };
  },

});
