


// Expose proxy to public internet 
const frontend = new k8s.core.v1.Service(appName, {
    metadata: { labels: nginx.spec.template.metadata.labels },
    spec: { 
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
        selector: appLabels,
    }
}, { provider: provider });

export const frontendIp = frontend.status.loadBalancer.ingress[0].ip;