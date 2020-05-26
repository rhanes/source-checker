# Source Checker

Source Checker is a simple polling tool that will poll a configured endpoint and detect/notify when a change is detected. Slack notifications can be configured by providing a webhook. Assets with diffs are saved to disk. 

This tool is intended to be used to detect changes in assets supplied by 3rd party sources to your project and provide the source code to be able to diff check the differences.

## Configuration Properties

| Property  | Description |
| ------------- | ------------- |
| interval    | A number in milliseconds to poll the monitored url |
| timeout     | A number in milliseconds to stop polling
| slack  | Object containing slack configuration parameters |

Providing configuration is optional. If a config is not provided, polling will default to once every minute and poll until the application is terminated.

## Example Usage

```javascript
const 'sourceChecker' = require('source-checker');

// poll every 30 seconds
// stop polling after 1 hour
// notify slack whenever a change is detected
const config = {
  interval: 30000,
  timeout: 3600000,
  slack: {
    webhook: 'https://hooks.slack.com/services/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',
    username: 'My Notifier Bot',
    icon_emoji: ':police_car:',
    text: 'A new version of ****** has been detected',
    attachmentColor: '#FF0000'
  }
}

// Starts the poller
sourceChecker('myendpoint/path/to/asset?any=params', config);
```
