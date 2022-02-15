// example for using this file with kubectl instead of pulumi
// pulumi stack output kubeconfig > kubeconfig.yml
// KUBECONFIG=./kubeconfig.yml kubectl get nodes

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

import * as nodeGroups from './node_groups.ts'

const name = "analysis";

// Create EKS cluster -- run aws eks get-token after deployment
// https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html#create-kubeconfig-manually
// for more info
const vpc = new awsx.ec2.Vpc("analysis-vpc", { subnets: [{ type: "public" }]});
const cluster = new eks.Cluster(name, {
    vpcId: vpc.id,
    publicSubnetIds: vpc.publicSubnetIds,
    privateSubnetIds: vpc.privateSubnetIds,
    nodeAssociatePublicIpAddress: false,
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
    storageClasses: "gp2",
    deployDashboard: false,
    enabledClusterLogTypes: [
        "api",
        "audit",
        "authenticator",
    ],
    instanceRoles: [ role1, role2 ],
});

// Create an AWS resource (S3 Bucket)
const bucket1 = new aws.s3.Bucket("data1");

// Export the name of the bucket
export const bucketName = bucket1.id;


// Create Kubernetes namespace
const ns = new k8s.core.v1.Namespace(name, {}, { provider: cluster.provider });
export const namespaceName = ns.metadata.apply(m => m.name);

// Canary Deployment
deploy.canary

service.loadBalancerk8

const load_balancer_aws = new awsx.lb.ApplicationListener("analysis", { port: 83 });
// Export service name and public endpoint of load balancer
export const url = load_balancer_aws.endpoint.hostname;


// Add fMRIprep image to cluster
const fMRIservice = new awsx.ecs.FargateService("app-svc", {
    taskDefinitionArgs: {
        container: {
            image: "fmriprep",
            portMappings: [ load_balancer_k8 ],
        },
    },
    desiredCount: 2,
});

// 

// Send kubeconfig 
export const kubeconfig = cluster.kubeconfig