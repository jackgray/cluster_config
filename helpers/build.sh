# The image then needs to be tagged with the URL of the repository you’re publishing to. This can be done using docker build’s -t argument, while building the image, as in:

# docker build -t 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830 .


# Alternatively, this can be done by tagging the image with docker tag after building or pulling it. For example, if the image ID to tag is e9ae3c220b23, then we would run the following:

# docker tag e9ae3c220b23 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830

#! /bin/env bash

awsRepoURL='012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830'

awsAuthToken=$(aws ecr get-authorization-token)

docker build \
-t $awsRepoURL \
../$appName