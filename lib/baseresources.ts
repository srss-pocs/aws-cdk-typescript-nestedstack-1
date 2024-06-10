import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';



export class BaseResources extends cdk.NestedStack {
    vpc: ec2.Vpc
    applicationSg: ec2.SecurityGroup
  
    constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
      super(scope, id, props)
  
      this.vpc = new ec2.Vpc(this, 'app-vpc', {
        cidr: '10.0.0.0/20',
        natGateways: 0,
        maxAzs: 2,
        enableDnsHostnames: true,
        enableDnsSupport: true,
        subnetConfiguration: [
          {
            cidrMask: 22,
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            cidrMask: 22,
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          },
        ],
      })
  
      this.applicationSg = new ec2.SecurityGroup(this, 'application-sg', {
        vpc: this.vpc,
        securityGroupName: 'application-sg',
      })
  
      this.applicationSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80))
    }
  }