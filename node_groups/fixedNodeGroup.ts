import { eks } from "@pulumi/aws";



export const fixedNodeGroup = cluster.createNodeGroup("analysis-ng1", {
    instanceType: "t2.medium",
    desiredCapacity: 2,
    minSize: 3,
    labels: {"ondemand": "true"},
    instanceProfile: instanceProfile1,
});

export const spotNodeGroup = new eks.NodeGroup("analysis-ng2", {
    cluster: cluster,
    instanceType: "t2.medium",
    desiredCapacity: 1,
    spotPrice: "1",
    minSize: 1,
    maxSize: 2,
    labels: {"preemptible": "true"},
    taints: {
        "special": {
            value: "true",
            effect: "NoSchedule",
        },
    },
    instanceProfile: instanceProfile2,
}, {
    providers: { kubernetes: cluster.provider},
});

export * from './node_groups.ts'