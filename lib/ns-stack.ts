import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BaseResources } from './baseresources';
import { AppResources } from './appresources';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NsStack extends cdk.Stack {
  baseResources: BaseResources
  appResources: AppResources

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.baseResources = new BaseResources(this, 'base-resources')
    const { vpc, applicationSg } = this.baseResources

    this.appResources = new AppResources(this, 'app-resources', {
      vpc,
      applicationSg,
    })

    this.appResources.addDependency(this.baseResources)
  }
}
