# mobile-app
<br>

# Overview

### **Description**
This is the repository for a mobile app by the [Chabot Space &amp; Science Center](https://chabotspace.org/) Galaxy Explorer Software Engineering Team. Created using [React Native.](https://reactnative.dev/)  
<br>  
### **Members**
* aidansunbury
* Rileyc2022  
* dexter36310  
* MaxAndelman  
* Miha Bhaskaran  
* rishita678  
* Robbie Sylvia  
* theobakshi12  
* timzhou16US  
<br>

### **Contact**  
[Discord Server](https://discord.gg/F35R2tV8Eu)  
<br>

# How to collaborate

### **Introduction**

This guide is for people who have no experience with git. Git is used in pretty much every software job so it's a good skill to have. I found it very frustrating and overwhelming learning it myself, so I hope I can give you a summary of what you need to know so it's not more confusing than it needs to be.  

The purpose of Github, or any service that uses the "git" protocol, is to collaborate while writing code. Think of it as google docs, but the syncing is manual. The "remote" repository is what you're looking at now. You need to make your "local" repository on your own machine. Git helps combine everyone's local code and upload it to this remote repository.   
  
The theory behind git is summed up in the image below.  

![image](https://support.nesi.org.nz/hc/article_attachments/360004194235/Git_Diagram.svg)  



### **Using Git**


1. Open Terminal and navigate to where you want to put your local repository using the "change directory" command. I suggest navigating to your documents folder like so:  
```
cd Documents
```

2. Now you are ready to use git. (Be aware that you might need to put in your github info after some of these steps!) First you need to copy this remote repository to your machine using the clone command:  
```
git clone https://github.com/Chabot-Software-Team/mobile-app.git
```
Then using finder, you will notice a new folder has been created in your documents folder. Drag that folder onto VS Code. It should open as a new workspace. Open the built in VS Code terminal by pressing control + ~ (control key and the tilde key, the one under the escape key). Also, click the PRACTICE.txt file in the left window. Now you can test out git.  



3. In the PRACTICE.txt file, write something, such as your name. You should see a tan M appear, marking this file as "modified". In the VS Code terminal, add all modified files to the staging area by typing:  

```
git add .
```
(git add and then a period)  

4. Next, commit your changes. This flattens all your modifications and saves them to your local repository. **(saving the files to your machine is not the same as saving to your local repository. They are saved to a seperate, hidden folder)**. Commit like so and add a commit message saying what you've done for future reference:  

```
git commit -m "Added name to PRACTICE.txt"
```
5. Tell git to save the url of the remote repository so you don't have to type it everytime. **If it says "fatal: remote origin already exists." don't worry just go to #4"**    
```
git remote add origin https://github.com/Chabot-Software-Team/mobile-app.git
```  
6. Now make sure that you are up to date with the remote repository before you push your own changes. You'll want to do this everytime before you start making changes (we did a clone instead, but after that, use pull), and before you push. That way, you can minimize merge conflicts or resolve them if they happen. 

```
git pull origin main
```
(main is called a branch, don't worry about that for now). You should see a message saying * branch main -> FETCH_HEAD "Already up to date."  

7. Nice, now you can upload your changes.

```
git push origin main
```

You should also go online and familiarize yourself with the following commands:
```
git reset
git branch
git checkout
git merge
```
Also, you can checkout this more detailed guide of what we've gone over: https://docs.github.com/en/free-pro-team@latest/github/using-git/using-common-git-commands  

<hr>
Hope this helps!  
<br>  
<br>  
-Rileyc2022
