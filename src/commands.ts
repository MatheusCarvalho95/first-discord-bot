const commands = [
  {
    name: "ping",
    description: "Reply the ms",
  },
  { name: "hello", description: "Says hello!" },
  { name: "play", description: "Play the requested song" },
  {
    name: "gif",
    description: "Get a random gif",
    options: [
      {
        name: "query",
        description: "a search query",
        required: false,
        type: 3,
      },
    ],
  },
  {
    name: "joke",
    description: "I'm gonna tell you a joke, not good, but a joke",
  },
  {
    name: "call",
    description: "call the server to play Apex Legends",
  },
];
export default commands;
