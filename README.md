# 🃏 @santima10/jest-chat-reporter [![node](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml/badge.svg)](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml)

> A jest reporter for chats like: Twitch, Discord, etc.

## Configuration

1. Install the package in your project with your favorite package manager.
2. In your `jest.config.js` file:

  ```js
  {
    //...
    reporters: [
        'default',
        [
          '@santima10/jest-chat-reporter',
          {
            channels: [], // an array with the twitch channels names the report is going to send messages
            username: '' // an string with the username for the twitch chat
            password: '' // an string with the oauth2 token for the twitch chat
          },
        ],
      ],
    //...
  }
  ```

## Inspiration

- [jest-plugin-yeelight](https://github.com/heedrox/jest-plugin-yeelight)
- [Slack jest reporter](https://github.com/BrunoScheufler/blog-code-examples/tree/master/custom-jest-reporter)
