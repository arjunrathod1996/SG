
import {DocumentListModel, documentListModel} from '../store/DocumentList.model';
import {PolicyListModel, policyListModel} from './PolicyList/policyList.model';

export interface PNPDataModel {
    documentList: DocumentListModel;
    // manageEntitiesList: ManageEntitiesModel;
    // policyApplicability: PolicyApplicabilityModal;
    policyList:PolicyListModel;
    // repository: RepositoryModel;
    // userRole: UserRole;
    // admin : AdminRole;
    // inProgress: InProgressModel;
    // localDocumentRequest: LocalDocumentRequestModel;
    // dispensationRequest:DispensationRequestModel;
}

export const pnpDataModel: PNPDataModel = {
    documentList: documentListModel,
    // manageEntitiesList: manageEntitiesModel,
    // policyApplicability: policyApplicabilityModal,
    policyList:policyListModel,
    // repository: repositoryModel,
    // userRole: userRole,
    // admin : adminRole,
    // inProgress: inProgressModel,
    // localDocumentRequest: localDocumentRequestModel,
    // dispensationRequest:dispensationRequestModel,
};
