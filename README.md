# 🃏 @santima10/jest-chat-reporter [![node](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml/badge.svg)](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/node.yml) [![Publish](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/publish.yml/badge.svg)](https://github.com/SantiMA10/jest-chat-reporter/actions/workflows/publish.yml)

⚠️⚠️ This package is still under development ⚠️⚠️

> A jest reporter for chats like: Twitch, Discord, etc.

## 🛠 Configuration

### 🟣 Twitch

<img align="right" src="https://user-images.githubusercontent.com/7255298/162411830-feb76671-b86a-46de-85ee-c4ba92228edf.gif" />

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
            useAnnounce: false // uses the /announce command in the Twitch Chat (default false) (needs moderator role)
          },
        ],
      ],
    //...
  }
  ```
  


## ✨ Inspiration

- [jest-plugin-yeelight](https://github.com/heedrox/jest-plugin-yeelight)
- [Slack jest reporter](https://github.com/BrunoScheufler/blog-code-examples/tree/master/custom-jest-reporter)

## 👀 How has this project been built?

Great question, we have a [playlist](https://www.youtube.com/watch?v=qe7IE8qdo6U&list=PLokEg24KkXH06UsAYxBZkOJ1YJsBKLRlk) with all the videos of how the project was build (in spanish)

## 🐛 Known issues

Sometimes jest cannot finish the process correctly ([more info in the issue](https://github.com/SantiMA10/jest-chat-reporter/issues/4)), until we solve the problem you can use the flag `--forceExit`.
