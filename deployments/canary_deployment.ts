



// Canary Deployment
const appName = "canary"
const appLabels = { appClass: appName };
const canary_deployment = new k8s.apps.v1.Deployment(`${appName}-dep`,
    {
        metadata: {
            namespace: namespaceName,
            labels: appLabels,
        },
        spec: {
            replicas: 2,
            selector: { matchLabels: appLabels },
            template: { 
                metadata: {
                    labels: appLabels,
                },
                spec: { 
                    containers: [
                        {
                            name: appName,
                            image: "nginx",
                            ports: [{ name: "http", containerPort: 80 }]
                        }
                    ]
                }
            },
        }
    },
    {
        provider: cluster.provider,
    }
);
// Export Deployment Name
export const deploymentName = canary_deployment.metadata.apply(m => m.name);