# Git Note

*Git,一种用C语言开发的分布式版本控制系统*。可安装在Linux、macOS、Windows、Raspberry Pi上。

## 初步认识

| 集中式(Linux)                                                | 分布式(Git)                                                  |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| 版本库(书)集中存放在中央服务器(图书馆)。要先从"图书馆"获取最新版本(借出)，处理后再推送回图书馆 | 没有中央服务器，不需要联网，多人协作只需把各自修改推送给对方 |
| 必须联网                                                     | 安全性高                                                     |

```
集中式和分布式的区别是：
你的本地是否有完整的版本库历史！
假设SVN服务器没了，那你丢掉了所有历史信息，因为你的本地只有当前版本以及部分历史信息。
假设GitHub服务器没了，你不会丢掉任何git历史信息，因为你的本地有完整的版本库信息。你可以把本地的git库重新上传到另外的git服务商。
```

## 操作

### 把文件添加到版本库

1. 创建空目录

   ```
   $ mkdir hello
   $ cd hello
   $ pwd
   /Users/User/hello
   ```

   `pwd`显示当前目录

2. 把目录变成Git可管理的仓库

   ```
   $ git init
   Initialized empty Git repository in /Users/User/hello/.git/
   ```

3. 打开VS Code,在源代码管理中找到hello文件夹，在文件夹中新建文档`hello.md`，并在文档中键入`Hello,余晨晓!`

4. 点击源代码管理，将所有更改存入暂存区，然后在消息栏填写`init: add hello files`点击提交。(在VS Code的源代码管理界面提交相当于执行了`git add .`和`git commit -m`)

5. 关联远程仓库。在终端输入`git remote add origin <远程仓库地址>`将远程仓库地址添加为origin

6. 用`git push -u origin main`推送本地提交到远程。

   > https://github.com/shakarobia35/Tasks/tree/main/githello-main

**另外，以下是传输时遇到的问题和解决办法。**

1. 我想复制A仓库的内容并把它移动到B仓库该怎么做?

   点击A仓库Code键，选择SSH下载其文件夹(如果是压缩包最好解压缩)，再点击B仓库Add files上传文件夹。

2. + `git branch`查看本地分支名(查看是main还是master)；
   + `cat readme.txt`显示文件内容；
   + 回溯过去的代码信息
    > + `git diff`查看修改内容;
    > + `git log`显示从最近到最远的提交日志,`git log --name-status -1`查看最近一次提交中包含的文件；
    > + `git status`检查本地与远程的同步状态；
   
   + **把文件退回到上个版本**
    >  + `git reset --hard HEAD^`将版本退回到上个版本的已提交状态，`--soft`是退回到未提交状态，`--mixed`会回退到上个版本已添加但未提交的状态;`git reset --hard 1094a`指定回到1094a这个版本；
   
   + 恢复未来版本
    > + `git reflog`记录每一次命令，可以据此查找commit id，再用reset恢复;
    > + `git push origin master:main`将本地的master分支推送到远程的main分支；
    > + `git pull origin master --allow-unrelated-histories`拉取远程仓库的内容并合并；
    > ```
     git add readme.txt /把文件添加到暂存区
     git commit -m "说明" /把暂存区所有内容提交到Git自建分支master
     git push origin main
     ```

## Git 原理

### 工作区和暂存区

**工作区**:在电脑里能看到的目录。

**版本库**:工作区的隐藏目录`.git`。含有称为stage（或index）的**暂存区**，Git自动创建的第一个分支`master`，以及指向`master`的一个指针`HEAD`。

***修改***

git管理的是修改，如果某次修改后没有使用`git add`命令，那么这次修改就不会放入暂存区，也就不会在输入`git commit`时被提交。要想让这次修改有效，必须先存入暂存区。即:

> 第一次修改 -> `git add` -> 第二次修改 ->` git add` -> git commit

提交代码后，用`git diff HEAD -- readme.txt`命令可以查看工作区和版本库里面最新版本的区别。

***撤销修改***

+ 作修改了，但还没添加到暂存区:

`git checkout -- file`可以丢弃工作区的修改，把文件恢复到上一个版本的状态。

命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

> 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
>
> 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

+ 作修改后添加到暂存区了，但还没有提交:

  用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区。此时的情况就和第一点一样了，依据第一点的步骤可以实现目的。

  `git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。

+ 已经提交了不合适的修改到版本库，想要撤销本次提交:进行**版本回退**(前提:代码暂未推送到远程库)

***删除***