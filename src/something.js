const sourceChecker = require('./index');

const config = {
  timeout: 60000,
  slack: {
    webhook: 'https://hooks.slack.com/services/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',
    username: 'something Bot',
    icon_emoji: ':police_car:',
    text: 'something text',
    attachmentColor: '#eeddde',
  },
};
sourceChecker('https://www.googletagmanager.com/gtag/js?id=UA-115508484-1&l=_analyticsDataLayer', config);
