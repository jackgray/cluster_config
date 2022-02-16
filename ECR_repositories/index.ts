import * as awsx from "@pulumi/awsx";
import * as lifecyclePolicyArgs from "./lifecycle_policy"

const repo_xnat2bids = new awsx.ecr.Repository("xnat2bids", { lifecyclePolicyArgs.xnat2bids });
const repo_pPull = new awsx.ecr.Repository("p-pull", { lifecyclePolicyArgs.pPull });

export const image_xnat2bids = repo.buildAndPushImage("../xnat2bids");

// Create load balanced service