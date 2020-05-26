const { IncomingWebhook } = require('@slack/webhook');

async function notifySlack(webhook, monitoredUrl, config = {}) {
  await webhook.send({
    username: config.username || 'Source Checker Notifier',
    icon_emoji: config.icon_emoji || ':bangbang:',
    text: config.text || 'A new version of your monitored asset has been detected...',
    attachments: [{
      color: config.attachmentColor || '#eed140',
      fields: [{
        title: 'Monitored URL',
        value: monitoredUrl,
        short: true,
      }],
    }],
  });
}

function createHook(webhookUrl) {
  return new IncomingWebhook(webhookUrl);
}

module.exports = {
  createHook,
  notifySlack,
};
