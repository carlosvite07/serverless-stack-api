import AWS from 'aws-sdk';
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    const data = JSON.parse(event.body);

    var params = {
        UserPoolId: 'us-east-1_ZzGtcsvlf', /* required */
        Username: data.email, /* required */
        DesiredDeliveryMediums: [
            'EMAIL'
        ],
        ForceAliasCreation: true,
        TemporaryPassword: 'tempPassword1',
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: data.email
            },
            {
                Name: 'name', /* required */
                Value: data.name
            },
            /* more items */
        ]
    };

    try{
        await cognitoidentityserviceprovider.adminCreateUser(params).promise();
        return success(params);
    } catch (e) {
        return failure({ status: e });
    }
}