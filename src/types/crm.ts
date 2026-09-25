// src/types/crm.ts

export interface Client {
  id: string;
  // General Info
  name: string; //[cite: 1]
  taxCode: string; //[cite: 1]
  email: string; //[cite: 1]
  phone: string; //[cite: 1]
  reaNumber: string; //[cite: 1]
  addressOfResidence: string; //[cite: 1]
  domicileAddress: string; //[cite: 1]

  // PEC Info
  pecEmail: string; //[cite: 1]
  pecPassword: string; //[cite: 1]

  // SPID Info
  spidUsername: string; //[cite: 1]
  spidPassword: string; //[cite: 1]
  spidOperator: string; //[cite: 1]

  // Tax Agency Info
  tinNumber: string; //[cite: 1]
  taxAgencyPincode: string; //[cite: 1]
  taxAgencyPassword: string; //[cite: 1]
  activityCode: string; //[cite: 1]

  // Documents Info (Storing file paths or verification booleans)
  hasIdentityCard: boolean; //[cite: 1]
  hasResidencePermit: boolean; //[cite: 1]
  hasPassport: boolean; //[cite: 1]
  hasSanitaryCard: boolean; //[cite: 1]

  // Project & Admin
  ongoingProject: string; //[cite: 1]
  projectStatus: "finished" | "working" | "pending"; //[cite: 1]
  paymentStatus: "paid" | "unpaid"; //[cite: 1]
  adminNotes: string; //[cite: 1]
}

export interface Company {
  id: string;
  // Company Information
  name: string; //[cite: 2]
  vatNumber: string; //[cite: 2]
  taxId: string; //[cite: 2]
  registeredOffice: string; //[cite: 2]
  pecEmail: string; //[cite: 2]
  pecPassword: string; //[cite: 2]

  // Legal Representative
  legalRepName: string; //[cite: 2]
  legalRepSurname: string; //[cite: 2]
  legalRepDob: string; //[cite: 2]
  legalRepPlaceOfBirth: string; //[cite: 2]
  legalRepResidenceAddress: string; //[cite: 2]
  legalRepDomicileAddress: string; //[cite: 2]
  legalRepPec: string; //[cite: 2]
  legalRepPecPassword: string; //[cite: 2]

  // Agency Credentials
  fisconelinePin: string; //[cite: 2]
  inpsRegistrationNo: string; //[cite: 2]

  // Chamber of Commerce
  chamberReaNumber: string; //[cite: 2]
  dateOfConstitution: string; //[cite: 2]
  chamberActivityCode: string; //[cite: 2]
  licenceNumber: string; //[cite: 2]
}

export interface Client {
  // ... existing fields ...
  lipeQ1?: boolean;
  lipeQ2?: boolean;
  lipeQ3?: boolean;
  lipeQ4?: boolean;
  vat?: boolean;
  pf740?: boolean;
  isa?: boolean;
  acct?: boolean;
  isDone?: boolean;
  identityCardPath?: string;
  residencePermitPath?: string;
  passportPath?: string;
  sanitaryCardPath?: string;
}

export interface Company {
  // ... existing fields ...
  lipeQ1?: boolean;
  lipeQ2?: boolean;
  lipeQ3?: boolean;
  lipeQ4?: boolean;
  vat?: boolean;
  balsheet?: boolean;
  form760?: boolean;
  irap?: boolean;
  isa?: boolean;
  pf740?: boolean;
  acct?: boolean;
  isDone?: boolean;
}
