import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";import * as k8s from "@pulumi/kubernetes";

const gitRepo = 'https://github.com/jackgray/nyspiXnat2bids.git'

const image = awsx.ecr.buildAndPushImage(gitRepo)

const appName = 'xnat2bids';
const appLabels = { appClass: appName };
const deployment = new k8s.apps.v1.Deployment(`${appName}-dep`, {
    metadata: { labels: appLabels },
    spec: {
        replicas: 2,
        selector: { matchLabels: appLabels },
        template: {
            spec: {
                containers: [{
                    name: appName,
                    image: image.image(),
                    ports: [{ name: "http", containerPort: 80 }]
                }],
            }
        }
    }
}, { provider: cluster.provider }
const service = new k8s.core.v1.Service(`${appName}-svc`, {
    metadata: { labels: appLabels },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: "http" }],
    }
});
);