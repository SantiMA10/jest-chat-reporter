# 🃏 @santima10/jest-chat-reporter [![node](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml/badge.svg)](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml)

⚠️⚠️ This package is still under development ⚠️⚠️

> A jest reporter for chats like: Twitch, Discord, etc.

## Configuration

### Twitch

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
            username: '', // an string with the username for the twitch chat
            password: '', // an string with the oauth2 token for the twitch chat
            messagesOnWatchMode: false, // report or not test results to twitch in watch mode (default false)
            onlyCI: false // report or not test results to twitch only on CI environments (default false)
          },
        ],
      ],
    //...
  }
  ```

## Inspiration

- [jest-plugin-yeelight](https://github.com/heedrox/jest-plugin-yeelight)
- [Slack jest reporter](https://github.com/BrunoScheufler/blog-code-examples/tree/master/custom-jest-reporter)

## How has this project been built?

Great question, we have a [playlist](https://www.youtube.com/watch?v=qe7IE8qdo6U&list=PLokEg24KkXH06UsAYxBZkOJ1YJsBKLRlk) with all the videos of how the project was build (in spanish)
