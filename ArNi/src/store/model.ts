import intl, { IntlModel} from '../store/intl.model';
import {pnpDataModel, PNPDataModel} from '../store/PNPData.model';

export interface AppStoreModel {
    intl: IntlModel;
    pnp: PNPDataModel;
}

const model: AppStoreModel = {
    intl,
    pnp: pnpDataModel,
}

export default model;