// Create a LoadBalancer Service 
const load_balancer_k8 = new k8s.core.v1.Service(name,
    {
        metadata: {
            labels: appLabels,
            namespace: namespaceName,
        },
        spec: {
            type: "LoadBalancer",
            ports: [{ port: 82, targetPort: "http" }],
            selector: appLabels,
        }
    },
    {
        provider: cluster.provider,
    }
);

export const serviceName = load_balancer_k8.metadata.apply(m => m.name);