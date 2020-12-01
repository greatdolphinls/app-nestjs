import { IUserProfile } from '../userProfiles/interfaces/userProfile.interface';
import { IUserIdentity } from '../userIdentities/interfaces/userIdentity.interface';

export interface IUser {
  profile: IUserProfile;
  identity: IUserIdentity;
}
