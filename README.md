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

## Step 3 - Create a Static Web App and link to this code

This step not only creates the Azure Static Web App in your Azure tenant, it also links it to the GitHub repository you just created. That means that the code will automatically be compiled and published for use by the Static Web App (without you needing to do any work!)

1. Navigate to https://portal.azure.com/#create/Microsoft.StaticApp to create a new Static Web App
1. Select your _Azure subscription_
1. Select or create a new _Resource Group_
1. Name the app       
1. Select a _Region_ closest to you
1. Select the **Free** _SKU_
1. Select the **Sign-in with GitHub** button and authenticate with GitHub

After you sign in with GitHub, enter the repository information.

1. Select your preferred _Organization_
1. Select the repository you just created from the _Repository_ drop-down
1. Select **master** from the _Branch_ drop-down

> [!NOTE]
> If you don't see any repositories, you may need to authorize Azure Static Web Apps in GitHub. Browse to your GitHub repository and go to **Settings > Applications > Authorized OAuth Apps**, select **Azure Static Web Apps**, and then select **Grant**. For organization repositories, you must be an owner of the organization to grant the permissions.

1. In the _Build Details_ section, set the following configuration details:

    1. Select **Custom** from the _Build Presets_ dropdown
    1. Keep the the default value in the _App location_ box
    1. Make sure thaat the _Api location_ value is set to "api"
    1. Leave the _App artifact location_ box empty


1. Select **Review + create**.

1. Select **Create**.

1. Select **Go to resource**.

## Step 4 - Wait for it to fail and then make some changes

The effect of joining your Static Web App to that GitHub repository is that it will kick-off a new build process to compile and deploy the code.

You can see this happening by going back to GitHub, and choose the Actions section of your repository.


Eventually, this action will fail. You can examine the reason why, but it's most probably because of these errors:

These are warnings that I've not been able to workaround in the code, and the only fix I've found is to disable checking for these warnings in the build process.

To fix this, go back to the code in GitHub. At the top, you'll notice that a new folder has been added: __.github/workflows__. In that folder is a new .yaml file. Edit that file, and insert the following lines immediately after the "name" entry on/around line 16:

````
env:
  CI: false
````

The file should now look like this.


Commit the file (to the master branch). This will kick-off the build process again, and this time it should suceed.
