const assume = require('assume');
const { IncomingWebhook } = require('@slack/webhook');
const slack = require('../../../src/integrations/slack');

describe('Slack', function() {
  describe('notifySlack', function() {
    it('should call send method with expected message', async function() {
      const stub = {
        send: (params) => {
          stub.calledWith = params;
        },
      };

      await slack.notifySlack(stub, 'example.com');
      assume(stub.calledWith).to.eql({
        username: 'Source Checker Notifier',
        icon_emoji: ':bangbang:',
        text: 'A new version of your monitored asset has been detected...',
        attachments: [{
          color: '#eed140',
          fields: [{
            title: 'Monitored URL',
            value: 'example.com',
            short: true,
          }],
        }],
      });
    });
  });
});