import { iam } from "@pulumi/aws";


const managedPolicyArns: string[] = [
    "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    "arn:aws:iam:aws:policy/AmazonEC2ContainerRegistryReadOnly",
];

export function createRole(name: string): aws.iam.Role {
    const role = new aws.iam.Role(name, {
        assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
            Service: "ec2.amazonaws.com",
        })
    });

    let counter = 0;
    for (const policy of managedPolicyArns) {
        const rpa = new aws.iam.RolePolicyAttachment(`${name}-policy-${counter++}`,
            { policyArn: policy, role: role },
        );
    };
    return role;
}

// Create roles & instance profiles for worker groups
const role1 = createRole("worker-role1");
const role2 = createRole("worker-role2");
const instanceProfile1 = new aws.iamInstanceProfile("instance-profile1", {role: role1});
const instanceProfile2 = new aws.iam.InstanceProfile("isntance-profile2", {role: role2});