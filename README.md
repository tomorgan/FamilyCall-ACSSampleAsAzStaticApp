# Simple Family Call

## Azure Communication Services Group Calling features deployed as Azure Static Web App with Azure Functions

This project builds heavily on this sample project:

[Azure Communication Services Group Calling Hero Sample](https://github.com/Azure-Samples/communication-services-web-calling-hero)

It takes the above sample, and makes it work with Azure Static Web Apps. It does this by implementing the back-end part (to get access keys etc) as API calls using Azure Functions, which are now [built right into Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/add-api).

This means that you can have your own group calling scenario up and running by deploying a single web app!

# How to deploy

## Step 1 - Create a Azure Communication Services instance

[Create a new Azure Communication Services instance]. Once it's created, go to Keys and make a note of one of the Connection Strings.

## Step 2 - Deploy this code

Click https://github.com/tomorgan/FamilyCall-ACSSampleAsAzStaticApp/generate

In the Repository name box, enter the name you want for the project

Click __Create repository from template__.

## Step 3 - Create a Static Web App

[Create a new Azure Static Web App]. Once it's created, [follow the steps here](https://docs.microsoft.com/azure/static-web-apps/get-started-portal?tabs=vanilla-javascript#create-a-static-web-app) to connect your Static Web App to the repository you created in Step 2
