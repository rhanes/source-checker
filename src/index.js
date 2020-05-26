const axios = require('axios');
const utils = require('./utils');
const slack = require('./integrations/slack');

const defaultConfig = {
  interval: 5000,
};

function sourceChecker(hostname, options = {}) {
  const config = Object.assign(defaultConfig, options);

  let slackHook;
  if (config.slack && config.slack.webhook) {
    slackHook = slack.createHook(config.slack.webhook);
  }

  const interval = setInterval(() => {
    axios.get(hostname)
      .then((response) => {
        const newVersionFound = utils.compareCurrentFiles(response.data);

        if (newVersionFound && slackHook) {
          slack.notifySlack(slackHook, hostname, config.slack);
        }
      })
      .catch((error) => {
        throw new Error('An unexpected error has occurred', error);
      });
  }, config.interval);

  if (config.timeout) {
    setTimeout(() => {
      clearInterval(interval);
    }, config.timeout);
  }
}

module.exports = sourceChecker;
