

// Custom chart repo
const chart = new k8s.helm.v3.Chart("empty", {
    chart: "raw",
    version: "0.1.0",
    fetchOpts: {
        repo: "https://charts.helm.sh/incubator",
    },
});

// fetched tarball
const chart2 = new k8s.helm.v3.Chart("empty1", {
    chart: "https://charts.helm.sh/incubatorraw-0.1.0.tgz",
});
