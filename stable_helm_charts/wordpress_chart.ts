import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

const wordpress = new k8s.helm.v3.Chart("wordpress", {
    repo: "stable",
    chart: "wordpress",
    values: {
        wordpressBlogName: "Imaging Lab News",
    },
}, {
    providers: {
        "kubernetes": cluster.provider 
    },
},)

export const kubeconfig = cluster.kubeconfig;