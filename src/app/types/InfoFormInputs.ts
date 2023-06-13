export interface InfoFormInputs {
  nickname: string;
  name: string;
  surname: string;
  sex: 'man' | 'woman';
}

export enum UserSex {
  man = 'man',
  woman = 'woman',
}
