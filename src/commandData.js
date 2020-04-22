const commandData = [
  {
    commandName: "pwd",
    why1: "pwd stands for print working directory. When you run this command, you will receive some output: the path from the root of your computer to your current directory.",
    why2: "Pwd can be run at any time and is solely informative, so it won’t “do” anything besides give you some information! As we learn more about other commands available to us, the importance of this one will be illustrated more and more.",
    how: [
      {code: [{command: "pwd"}, {output: "/root"}]},
      {text: "blah blah blah"}
    ],
    mistakes: [{text: "You can’t really use pwd incorrectly, so there aren’t any error messages you need to know about!"}],
  },

  {
    commandName: "ls",
    why1: "LS is short for “list”. When you run this command, you will receive output: the name of every file or directory that lives directly inside of your current directory.",
    why2: "LS can be run at any time and is solely informative, so it won’t “do” anything besides give you some information! It’s a great tool to double check that the contents inside of your current directory are actually what you think they are!",
    how: [
      {code: [{command: "ls"}, {output: "personal  projects  classwork"}]},
      {text: "Providing arguments, or additional information, to the ls command is optional. As a beginner, you usually don’t need to pass any arguments to ls. There are some advanced things ls can do with specific arguments. You can read more about it here (link a good resource)"
      }
    ],
    mistakes: [{text: "There aren’t any error messages you need to know about right now."}],
  },

  {
    commandName: "cd",
    why1: "CD stands for “change directory”. This command allows us to move around the directory structure, which changes the current working directory.",
    why2: "CD does not provide any output, so when you’re new to it, you might wonder if it “worked”. That’s where pwd and ls will come in handy!",
    how: [
      {text: "To change directories, you need to tell the terminal WHERE you want to go! You do this by providing an (optional) argument to the CD command. Check out the examples below:"},
      {text: "If we pass an argument of the name of a child directory, that will be your new working directory"},
      {code: [
        {command: "pwd"}, {output: "root/"},
        {command: "ls"}, {output: "projects  practice"},
        {command: "cd projects"}, {output: ""},
        {command: "pwd"}, {output: "projects"},
      ]},
      {text: "If we pass an argument of `..`, the parent will be your new working directory"},
      {code: [
        {command: "pwd"}, {output: "projects"},
        {command: "cd .."}, {output: ""},
        {command: "pwd"}, {output: "root/"},
      ]},
      {text: "If we don’t pass it an argument, you will go all the way back to the root directory"},
      {code: [
        {command: "pwd"}, {output: "root/"},
        {command: "cd projects"}, {output: ""},
        {command: "ls"}, {output: "memory-game first-project"},
        {command: "cd memory-game"}, {output: ""},
        {command: "cd"}, {output: ""},
        {command: "pwd"}, {output: "root/"},
      ]},
    ],
    mistakes: [{text: "If we pass an argument of a series of character that does not match a child directory name or “..”, we will be given some output letting us know that a directory with that name does not exist"}],
  },

  {
    commandName: "touch",
    why1: "The touch command allows us to create a new file. Unlike the other commands we are learning about today, the command of “touch” doesn’t feel like it really lines up with what it’s job is. ",
    how: [
      {text: "First, make sure your current working directory is the directory that where you want the new file to be. Then type touch, then the name of the file you want to create, then hit return. A file with that name will be created inside of my current working directory. Once you run the command, you won't be provided with any output. You can use ls to verify that your file was created."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project"},
        {command: "touch file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project  file.txt"},
      ]},
      {text: "You can also use touch to create more than one file at once."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project file.txt"},
        {command: "touch index.js styles.css"}, {output: ""},
        {command: "ls"}, {output: "first-project  file.txt  index.js  styles.css"},
      ]},
    ],
    mistakes: [{text: "Pro Tip: when you run touch, get in the habit of including the file extension (example: .js, .rb). Your terminal will allow you to touch a file without an extension; but when you open it up in your text editor, you’ll have some problems. It’s best to include the file extension you want when you initially create the file with touch. Note that file names cannot contain a space! You can use kebab-case or camelCase if you have a multi-word file name!"}],
  },

  {
    commandName: "mkdir",
    why1: "The mkdir command is short for “make directory” and it allows you to create a new directory.",
    how: [
      {text: "First, make sure your current working directory is the directory that where you want the new directory to be. You can run mkdir with one or more arguments. The arguments should be the names of the directories you want to create."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project"},
        {command: "mkdir second-project"}, {output: ""},
        {command: "ls"}, {output: "first-project  second-project"},
      ]},
      {text: "You can also use mkdir to create more than one directory at once."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project second-project"},
        {command: "mkdir third-project another-project"}, {output: ""},
        {command: "ls"}, {output: "first-project  second-project  third-project  another-project"},
      ]},
    ],
    mistakes: [{text: "Note that making a new directory does NOT change your current working directory. Many times, we will make a directory, then immediately after, touch several files that are intended to live in that directory. In order to do that, you’ll need to run this series of commands: (insert code snippets for mistakes later!)"}],
  },

  {
    commandName: "rm",
    why1: "RM is short for “remove”. It is used to remove a specific file or specific files.",
    how: [
      {text: "First, make sure you are in the directory that holds the file you want to delete. Then type rm, then the name of the file you want to remove, then hit return. If a file with that name exists in your current directory, it will be removed. Once you run the command, you won't be provided with any output. You can use ls to verify that your file was removed."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project  file.txt"},
        {command: "rm file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project"},
      ]},
      {text: "You can also use rm to remove more than one file at once."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project  file.txt  index.js"},
        {command: "rm index.js file.txt"}, {output: ""},
        {command: "ls"}, {output: "first-project"},
      ]},
    ],
    mistakes: [{text: "If you pass an argument to rm that does not exist in your current directory, you will get some output with a message telling you that (example)"}],
  },

  {
    commandName: "rmdir",
    why1: "RMDIR is short for “remove directory”. It is used to remove a specific directory or specific directories.",
    how: [
      {text: "First, make sure you are in the directory that holds the directory you want to delete. Then type rmdir, then the name of the directory you want to remove, then hit return. If a directory with that name exists in your current directory, it will be removed. Once you run the command, you won't be provided with any output. You can use ls to verify that your directory was removed."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project  file.txt"},
        {command: "rmdir first-project"}, {output: ""},
        {command: "ls"}, {output: "file.txt"},
      ]},
      {text: "You can also use rmdir to remove more than one directory at once."},
      {code: [
        {command: "pwd"}, {output: "root/projects"},
        {command: "ls"}, {output: "first-project  second-project  thrid-project"},
        {command: "rmdir first-project second-project"}, {output: ""},
        {command: "ls"}, {output: "third-project"},
      ]},
    ],
    mistakes: [{text: "If you pass an argument to rm that does not exist in your current directory, you will get some output with a message telling you that (example)"}],
  },

];

export default commandData;
