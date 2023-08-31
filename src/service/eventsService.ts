import { getURL, postURL, userKey} from "../constants";
import { eventsInvitation } from "../types/eventsForPartners.types";

export const getAllPartnersList = async(): Promise<any> => {
    const response = await fetch(getURL+'userKey='+userKey);
    /* check on status since API returns 500 error code with response and status 200 */
    if(response !== undefined && response.status !== 500){
        return await response.json().then((data) => {
            return data.partners;
        });
    }
    else {
        return undefined
    }
}

export const submitAvailabilityForEvents = async(data: any): Promise<any> => { 
    const response = await fetch(postURL+'userKey='+userKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response;
}