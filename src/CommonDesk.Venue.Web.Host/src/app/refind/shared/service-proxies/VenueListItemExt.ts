import * as Rt from '@shared/service-proxies/refind/ReFind.dtos';

export class VenueListItemExt extends Rt.VenueListItem {    
    
    IsItemSelected: boolean;

    constructor(private p: Rt.VenueListItem) {
        super(p)
    }
}
