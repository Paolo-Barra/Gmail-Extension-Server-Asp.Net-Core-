//
// obsolete: can be removed
//
export class RecipeDataStructureBuilder 
{
        constructor(
            private userAccountId: string,
            private deviceId: string
            ) {}

        getSaveRecipeRequest(criteria) {
            return {
                "Criteria": criteria,
                "RecipeId": criteria.RecipeId,
                "UserAccountId": this.userAccountId,
                "DeviceId": "Portal",
                "RecipeType": "VenueTree"
            }
        }
    
        getDeleteAddedVenuesRequest(avlist: any[]) {
            let req = {
                'UserAccountId': this.userAccountId,
                'DeviceId': this.deviceId
            }
    
            avlist.forEach(x => {
                x.UserAccountId = this.userAccountId;
            });
    
            // req.DeletedVenues = this.addedVenues;
            return req;
        }
        getCookbookTemplateRequest(tid)
        {
            return  {
                'CookbookTemplateId': tid,
                'UserAccountId': this.userAccountId,
                'DeviceId': this.deviceId
            };
        }
    
        getDeleteRecipeRequest(mid,nm,rid)
        {
            return {
                'MailAccountId': mid,
                'DeviceId': this.deviceId,
                'UserAccountId': this.userAccountId,
                'Name': nm,
                'RecipeId': rid, 
            };
        }
        getListRecipesRequest(rid)
        {
            return  {
                'RecipeId': rid,
                'UserAccountId': this.userAccountId,
                'DeviceId': this.deviceId,
            };
        }
        getAccountsOnDeviceRequest()
        {
            return  {
                'UserAccountId': this.userAccountId,
                'DeviceId': this.deviceId,
            };
        }
            
        getListCategoriesRequest()
        {
            return  {
                'UserAccountId': this.userAccountId,
            };
        }

        getCookbookRequest(cid)
        {
            return  {
                'UserAccountId': this.userAccountId,
                'CookbookId': cid
            };
        }
        getDeleteCookbookRequest(cid){
            return {
                'DeviceId': this.deviceId,
                'UserAccountId': this.userAccountId,
                'CookbookId': cid,
            };
        }
        getCdRecipeTemplateRequest(tid)
        {
            return  {
                'TemplateId': tid,
                'UserAccountId': this.userAccountId,
                'DeviceId': this.deviceId
            };
        }
    
        getSaveVenueRequest(criteria) {
            return {
                'UserAccountId': this.userAccountId,
                'MailAccountId': criteria.MailAccountId,
                'AddedVenues': [
                    {
                        'Name': criteria.Name,
                        'ParentVenueId': 'TopLevel',
                        'OwnerId': criteria.RecipeId,
                        'UserAccountId': this.userAccountId,
                        'VenueSource': 'UserGenerated',
                        'VenueType': 'Standard',
                        'Command': 'None',
                        'Owner': 'Recipe',
                        'DeviceId': this.deviceId,
                        'MailAccountId': criteria.MailAccountId
                    }
                ],
                'DeviceId': this.deviceId
            }
        }
    
        getMakeRecipeCriteriaRequest(rm,cm)
        {
            return {
                "Data": rm,
                "Cookbook": cm,
                "UserAccountId": this.userAccountId,
                "DeviceId": this.deviceId,
            };
        }
        getAddCookbookRequest(tid,mid,cbm) {
            return {
                "CookbookTemplateId": tid,
                "DeviceId": "Portal",
                "Force": true,
                "MailAccountId": mid,
                "Metadata": cbm,
                "UserAccountId": this.userAccountId
            }
        }
    
        getUpdateCookbookRequest(tid,iid,mid,cbm) 
        {
            return {
                "CookbookTemplateId": tid,
                "CookbookId": iid,
                "MailAccountId": mid,
                "UserAccountId": this.userAccountId,
                "DeviceId": "Portal",
                "Metadata": cbm,
            }
        }
}
