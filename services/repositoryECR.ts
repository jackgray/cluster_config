import * as awsx from "@pulumi/awsx";

// Create repository
const repo = new awsx.ecr.Repository("my-repo");

// Publish url of repo 
 export const urlRepo = repo.repository.repositoryUrl;