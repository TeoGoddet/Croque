// @flow

import type { Location } from './locations';
import config from './config';

const happyEmail = (firstName: string, others: Array<string>, location: Location): string =>
  `Hey ${firstName},
  
Here is finally your lunch rendez-vous!
Let's meet ${others.join(', ')} at 12.10PM at ${location.name}.
Please go ${location.details} (${location.plan}) and look for the others on time :).
As a discrete rallying sign you can put one hand on your stomach.

Bon appétit and have fun!

Croque

PS: We are happy to hear your feedback, just reply to this email!
  `;

const sadEmail = (firstName: string): string =>
  `Hey ${firstName},

Sorry we weren't able the find enough people matching your language settings for the next lunch.
Help us to spread the word and be sure this doesn't happen again!

Bon appétit and see you at next lunch!

Croque
  `;

const reminderEmail = (firstName: string): string =>
  `Hey ${firstName},

Croque lunch is running today!
Join or update your reminder settings there:
${config.url}/drink

See you and book before 11:30AM!

Croque

PS: Disable this reminder via ${config.url}/unsubscribe
  `;

export { happyEmail, sadEmail, reminderEmail };
