# 🚀 **Wcat Command Line Project**

It is used to display or make a copy content of one or more files in the terminal 

## 👨‍💻 **Commands:**
1. wcat filepath => displays content of the file in the terminal ✔
1. wcat filepath1 filepath2 filepath3... => displays content of all files in the terminal(concatinated form) in the given order. ✔
1. wcat -s filepath => convert big line breaks into a singular line break. ✔
1. wcat -n filepath => give numbering to all the lines.  ✔
1. wcat -b filepath => give numbering to all non-empty lines.  ✔
1. wcat filename1path > filename2path => put all the content of filename1path into filename2path by overriding and also creates filename2path if it doesn't exist. ✔
1. wcat filename1path >> filename2path => append all the content of filename1path into filename2path and also creates filename2path if it doesn't exist. ✔
1. node wcat -s filename2path > filename2path => get the file content of filename remove large spaces and save the output in filename2path. ✔
#### _We can mix and match the options._

## 🚫 **Edge cases:**

1. If entered files are not found then it must give files do not exist error.
1. If -n and -b, 2 options are available together then command should give you an error, that both options can not be processed
simultaneously.