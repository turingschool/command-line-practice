const commandData = [
  {
    commandName: "pwd",
    why1: "When you wonder, \"where am I in the directory stucture?\", pwd will help answer that question. When you run this command, it will provide output informing you of the file path of your current working directory.",
    why2: "pwd can be run at any time and is solely informative, so it won’t do anything besides give you some information! As we learn more about other commands available to us, the importance of this one will be illustrated more and more.",
    how: [
      {text: "Type pwd, then hit return!"},
      {code: [{command: "pwd"}, {output: "/root"}]},
    ],
    mistakes: [{text: "You can’t really use pwd incorrectly, so there aren’t any error messages you need to know about!"}],
  },

  {
    commandName: "ls",
    why1: "If you are wondering what contents are inside of your current working directory, ls will help you out! ls is short for list. When you run this command, name of every file or directory that lives directly inside of your current working directory will be printed out.",
    why2: "ls can be run at any time and is solely informative, so it won’t “do” anything besides give you some information! It’s a great tool to double check that the contents inside of your current directory are actually what you think they are.",
    how: [
      {text: "Type ls, then hit return!"},
      {code: [{command: "ls"}, {output: "personal  projects  classwork"}]},
      {text: "Providing arguments, or additional information, to the ls command is optional. As a beginner, you usually don’t need to pass any arguments to ls. There are some advanced things ls can do with specific arguments. You can read more about it here (link a good resource)."}
    ],
    mistakes: [{text: "There aren’t any error messages you need to know about right now."}],
  },

  {
    commandName: "cd",
    why1: "If you want to navigate around the directories, cd will allow you to do that. cd stands for “change directory”. It command allows us to move both up and down the directory structure, which changes the current working directory.",
    why2: "cd does not provide any output, so when you’re new to it, you might wonder if it worked. That’s where pwd and ls will come in handy!",
    how: [
      {text: "To change directories, you need to tell the terminal WHERE you want to go! You do this by providing an (optional) argument to the cd command. Check out the examples below:"},
      {text: "If you pass an argument of the name of a child directory, you will navigate into that directory."},
      {code: [
        {command: "pwd"}, {output: "/root"},
        {command: "ls"}, {output: "projects  practice"},
        {command: "cd projects"}, {output: ""},
        {command: "pwd"}, {output: "/root/projects"},
      ]},
      {text: "You can also use cd to navigate into a grandchild directory."},
      {code: [
        {command: "pwd"}, {output: "/root"},
        {command: "ls"}, {output: "projects  practice"},
        {command: "cd projects/first-project"}, {output: ""},
        {command: "pwd"}, {output: "/root/projects/first-project"},
      ]},
      {text: "If you pass an argument of .. you will navigate up a directory."},
      {code: [
        {command: "pwd"}, {output: "/projects"},
        {command: "cd .."}, {output: ""},
        {command: "pwd"}, {output: "/root"},
      ]},
      {text: "Similar to using the navigating into a grandchild directory, we can use the .. pattern to navigate up to a grandparent director."},
      {code: [
        {command: "pwd"}, {output: "/root/projects/first-project"},
        {command: "cd ../.."}, {output: ""},
        {command: "pwd"}, {output: "/root"},
      ]},
      {text: "If you don’t pass it an argument, you will navigate all the way back to the root directory."},
      {code: [
        {command: "pwd"}, {output: "/root"},
        {command: "cd projects/memory-game"}, {output: ""},
        {command: "ls"}, {output: "card.js game.js game-runner.js"},
        {command: "cd"}, {output: ""},
        {command: "pwd"}, {output: "/root"},
      ]},
    ],
    mistakes: [
      {text: "If you pass an argument of a series of character that does not match a child directory name or “..”, you will be given some output letting us know that a directory with that name does not exist."}
    ],
  },

  {
    commandName: "touch",
    why1: "If you want to make a new file, you'll use the touch command.",
    why2: "Unlike the other commands we are learning about today, the name of “touch” doesn’t feel like it really lines up with what it’s job is. 🤷‍♀️",
    how: [
      {text: "First, make sure your current working directory is the directory that that you want the new file to be inside of. Then type touch, then the name of the file you want to create, then hit return. A file with that name will be created inside of my current working directory."},
      {text: "Once you run the command, you won't be provided with any output. You can use ls to verify that your file was created."},
      {text: "In this first example, one argument is passed to touch."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project"},
        {command: "touch file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project  file.txt"},
      ]},
      {text: "You can also use touch to create more than one file at once, illustrated below."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project file.txt"},
        {command: "touch index.js styles.css"}, {output: ""},
        {command: "ls"}, {output: "first-project   file.txt   index.js   styles.css"},
      ]},
    ],
    mistakes: [
      {text: "Note that file names cannot contain a space. You can use kebab-case or camelCase if you have a multi-word file name!"},
      {text: "When you run touch, get in the habit of including the file extension (example: .js, .rb). Your terminal will allow you to touch a file without an extension; but when you open it up in your text editor, you’ll have some problems. It’s best to include the file extension when you initially create the file with touch."}
    ],
  },

  {
    commandName: "mkdir",
    why1: "If you want to make a new directory, you'll use the mkdir command. It is short for make directory.",
    why2: "It is important to know that this file will be truly deleted; not just moved to the recycle bin.",
    how: [
      {text: "First, make sure your current working directory is the directory that that you want the new directory to be inside of. You can run mkdir with one or more arguments. The arguments should be the names of the directories you want to create."},
      {text: "In this first example, one argument is passed to mkdir."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project"},
        {command: "mkdir second-project"}, {output: ""},
        {command: "ls"}, {output: "first-project  second-project"},
      ]},
      {text: "You can also use mkdir to create more than one directory at once."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project second-project"},
        {command: "mkdir third-project another-project"}, {output: ""},
        {command: "ls"}, {output: "first-project  second-project  third-project  another-project"},
      ]},
    ],
    mistakes: [
      {text: "Note that making a new directory does NOT change your current working directory. Many times, you will make a directory, then immediately after, want to touch several files that are intended to live inside of that newly created directory. In order to do that, you’ll need to run this series of commands:"},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "mkdir final-project"}, {output: ""},
        {command: "cd final-project"}, {output: ""},
        {command: "touch runner.rb deck.rb card.rb"}, {output: ""},
        {command: "ls"}, {output: "runner.rb  deck.rb  card.rb"}
      ]}
    ],
  },

  {
    commandName: "rm",
    why1: "If you want to remove a file or set of files, you can use rm. It is short for remove.",
    how: [
      {text: "First, make sure you are in the directory that contains the file you want to remove. You can run rm with one or more arguments. The arguments should be the names of the files you want to remove. Once you run the command, you won't be provided with any output. You can use ls to verify that your file was removed."},
      {text: "You can pass one argument to rm."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project  file.txt"},
        {command: "rm file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project"},
      ]},
      {text: "You can pass multiple arguments to rm to remove more than one file at once."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project  file.txt  index.js"},
        {command: "rm index.js file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project"},
      ]},
    ],
    mistakes: [
      {text: "If you pass an argument to rm that does not match the name of a file in your current working directory, you will get some output with a message telling you that."},
      {code: [
        {command: "ls"}, {output: "index.js file.txt"},
        {command: "rm card.js"}, {output: "rm: card.js: No such file or directory"},
      ]},
    ],
  },

  {
    commandName: "rmdir",
    why1: "If you want to remove an entire directory from your command line, you can use rm. It is short for remove directory.",
    why2: "You can only run rm on a directory that has no contents. Similar to the way rm works, rmdir deletes the directory completely, so requiring an empty directory is a safety precaution so that we don't accidentally remove something we don't mean to! ",
    how: [
      {text: "First, make sure you are in the directory that contains the directory you want to delete. You can run rmdir with one or more arguments. The arguments should be the names of the directories you want to remove. It is advised that you only remove one directory at a time!"},
      {text: "If a directory with that name exists in your current directory, it will be removed. Once you run the command, you won't be provided with any output. You can use ls to verify that your directory was removed."},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project  file.txt"},
        {command: "rmdir first-project"}, {output: ""},
        {command: "ls"}, {output: "file.txt"},
      ]}
    ],
    mistakes: [
      {text: "If you pass an argument to rmdir that does not match the name of a directory in your current directory, you will get some output with a message telling you that."},
      {code: [
        {command: "ls"}, {output: "first-project second-project"},
        {command: "rm third-project"}, {output: "rmdir: third-project: No such file or directory"},
      ]}
  ],
  },

  {
    commandName: "clear",
    why1: "If you want to hide your previous commands and see a clean, fresh terminal, run clear! You can run clear from directory, at any time.",
    how: [
      {text: "Run clear:"},
      {code: [
        {command: "pwd"}, {output: "/root/projects"},
        {command: "ls"}, {output: "first-project  file.txt"},
        {command: "clear"}, {output: ""},
      ]},
      {text: "Continue working, now from a clean terminal!"},
      {code: [
        {command: ""}, {output: ""},
      ]}
    ],
    mistakes: [
      {text: "You can't mess anything up with this one!"},
    ],
  },

];

export default commandData;
