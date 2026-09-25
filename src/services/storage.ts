import Database from "@tauri-apps/plugin-sql";
import type { Client, Company } from "../types/crm";

const DB_NAME = "sqlite:crm.db";

export const StorageService = {
  async saveClient(client: Client) {
    const db = await Database.load(DB_NAME);

    await db.execute(
      `INSERT INTO clients (
        id, name, tax_code, email, phone, rea_number, address_of_residence, domicile_address,
        pec_email, pec_password, spid_username, spid_password, spid_operator,
        tin_number, tax_agency_pincode, tax_agency_password, activity_code,
        ongoing_project, project_status, payment_status, admin_notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15, $16, $17,
        $18, $19, $20, $21
      )`,
      [
        client.id,
        client.name || null,
        client.taxCode || null,
        client.email || null,
        client.phone || null,
        client.reaNumber || null,
        client.addressOfResidence || null,
        client.domicileAddress || null,
        client.pecEmail || null,
        client.pecPassword || null,
        client.spidUsername || null,
        client.spidPassword || null,
        client.spidOperator || null,
        client.tinNumber || null,
        client.taxAgencyPincode || null,
        client.taxAgencyPassword || null,
        client.activityCode || null,
        client.ongoingProject || null,
        client.projectStatus || "working",
        client.paymentStatus || "unpaid",
        client.adminNotes || null,
      ],
    );
  },

  async updateClient(client: Client) {
    const db = await Database.load(DB_NAME);

    await db.execute(
      `UPDATE clients SET 
        name = $1, tax_code = $2, email = $3, phone = $4, rea_number = $5, 
        address_of_residence = $6, domicile_address = $7, pec_email = $8, 
        pec_password = $9, spid_username = $10, spid_password = $11, 
        spid_operator = $12, tin_number = $13, tax_agency_pincode = $14, 
        tax_agency_password = $15, activity_code = $16, ongoing_project = $17, 
        project_status = $18, payment_status = $19, admin_notes = $20
      WHERE id = $21`,
      [
        client.name || null,
        client.taxCode || null,
        client.email || null,
        client.phone || null,
        client.reaNumber || null,
        client.addressOfResidence || null,
        client.domicileAddress || null,
        client.pecEmail || null,
        client.pecPassword || null,
        client.spidUsername || null,
        client.spidPassword || null,
        client.spidOperator || null,
        client.tinNumber || null,
        client.taxAgencyPincode || null,
        client.taxAgencyPassword || null,
        client.activityCode || null,
        client.ongoingProject || null,
        client.projectStatus || "working",
        client.paymentStatus || "unpaid",
        client.adminNotes || null,
        client.id, // $21 is the ID used to find the right row
      ],
    );
  },

  async loadClients(): Promise<Client[]> {
    const db = await Database.load(DB_NAME);

    const result = await db.select<any[]>("SELECT * FROM clients");

    return result.map((row) => ({
      id: row.id,
      name: row.name,
      taxCode: row.tax_code,
      email: row.email,
      phone: row.phone,
      reaNumber: row.rea_number,
      addressOfResidence: row.address_of_residence,
      domicileAddress: row.domicile_address,
      pecEmail: row.pec_email,
      pecPassword: row.pec_password,
      spidUsername: row.spid_username,
      spidPassword: row.spid_password,
      spidOperator: row.spid_operator,
      tinNumber: row.tin_number,
      taxAgencyPincode: row.tax_agency_pincode,
      taxAgencyPassword: row.tax_agency_password,
      activityCode: row.activity_code,
      ongoingProject: row.ongoing_project,
      projectStatus: row.project_status,
      paymentStatus: row.payment_status,
      adminNotes: row.admin_notes,
      lipeQ1: !!row.lipe_q1,
      lipeQ2: !!row.lipe_q2,
      lipeQ3: !!row.lipe_q3,
      lipeQ4: !!row.lipe_q4,
      vat: !!row.vat,
      pf740: !!row.pf_740,
      isa: !!row.isa,
      acct: !!row.acct,
      isDone: !!row.is_done,
      identityCardPath: row.identity_card_path,
      residencePermitPath: row.residence_permit_path,
      passportPath: row.passport_path,
      sanitaryCardPath: row.sanitary_card_path,
    })) as Client[];
  },

  async updateClientDocument(clientId: string, column: string, path: string) {
    const db = await Database.load(DB_NAME);
    await db.execute(`UPDATE clients SET ${column} = $1 WHERE id = $2`, [
      path,
      clientId,
    ]);
  },

  async saveCompany(company: any) {
    const db = await Database.load(DB_NAME);

    await db.execute(
      `INSERT INTO companies (
        id, name, vat_number, tax_id, registered_office,
        pec_email, pec_password, legal_rep_name, legal_rep_surname,
        legal_rep_dob, legal_rep_place_of_birth, fisconeline_pin,
        inps_registration_no, date_of_constitution, licence_number
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15
      )`,
      [
        company.id,
        company.name || null,
        company.vatNumber || null,
        company.taxId || null,
        company.registeredOffice || null,
        company.pecEmail || null,
        company.pecPassword || null,
        company.legalRepName || null,
        company.legalRepSurname || null,
        company.legalRepDob || null,
        company.legalRepPlaceOfBirth || null,
        company.fisconelinePin || null,
        company.inpsRegistrationNo || null,
        company.dateOfConstitution || null,
        company.licenceNumber || null,
      ],
    );
  },

  async updateCompany(company: any) {
    const db = await Database.load(DB_NAME);

    await db.execute(
      `UPDATE companies SET 
        name = $1, vat_number = $2, tax_id = $3, registered_office = $4, 
        pec_email = $5, pec_password = $6, legal_rep_name = $7, legal_rep_surname = $8, 
        legal_rep_dob = $9, legal_rep_place_of_birth = $10, fisconeline_pin = $11, 
        inps_registration_no = $12, date_of_constitution = $13, licence_number = $14
      WHERE id = $15`,
      [
        company.name || null,
        company.vatNumber || null,
        company.taxId || null,
        company.registeredOffice || null,
        company.pecEmail || null,
        company.pecPassword || null,
        company.legalRepName || null,
        company.legalRepSurname || null,
        company.legalRepDob || null,
        company.legalRepPlaceOfBirth || null,
        company.fisconelinePin || null,
        company.inpsRegistrationNo || null,
        company.dateOfConstitution || null,
        company.licenceNumber || null,
        company.id, // $15 is the ID used to find the right row
      ],
    );
  },

  async loadCompanies(): Promise<any[]> {
    const db = await Database.load(DB_NAME);
    const result = await db.select<any[]>("SELECT * FROM companies");

    return result.map((row) => ({
      id: row.id,
      name: row.name,
      vatNumber: row.vat_number,
      taxId: row.tax_id,
      registeredOffice: row.registered_office,
      pecEmail: row.pec_email,
      pecPassword: row.pec_password,
      legalRepName: row.legal_rep_name,
      legalRepSurname: row.legal_rep_surname,
      legalRepDob: row.legal_rep_dob,
      legalRepPlaceOfBirth: row.legal_rep_place_of_birth,
      fisconelinePin: row.fisconeline_pin,
      inpsRegistrationNo: row.inps_registration_no,
      dateOfConstitution: row.date_of_constitution,
      licenceNumber: row.licence_number,
      lipeQ1: !!row.lipe_q1,
      lipeQ2: !!row.lipe_q2,
      lipeQ3: !!row.lipe_q3,
      lipeQ4: !!row.lipe_q4,
      vat: !!row.vat,
      balsheet: !!row.balsheet,
      form760: !!row.form_760,
      irap: !!row.irap,
      isa: !!row.isa,
      pf740: !!row.pf_740,
      acct: !!row.acct,
      isDone: !!row.is_done,
    }));
  },
  async updateClientTax(client: Client) {
    const db = await Database.load(DB_NAME);
    await db.execute(
      `UPDATE clients SET 
        lipe_q1 = $1, lipe_q2 = $2, lipe_q3 = $3, lipe_q4 = $4,
        vat = $5, pf_740 = $6, isa = $7, acct = $8, is_done = $9
       WHERE id = $10`,
      [
        client.lipeQ1 ? 1 : 0,
        client.lipeQ2 ? 1 : 0,
        client.lipeQ3 ? 1 : 0,
        client.lipeQ4 ? 1 : 0,
        client.vat ? 1 : 0,
        client.pf740 ? 1 : 0,
        client.isa ? 1 : 0,
        client.acct ? 1 : 0,
        client.isDone ? 1 : 0,
        client.id,
      ],
    );
  },

  async updateCompanyTax(company: Company) {
    const db = await Database.load(DB_NAME);
    await db.execute(
      `UPDATE companies SET 
        lipe_q1 = $1, lipe_q2 = $2, lipe_q3 = $3, lipe_q4 = $4,
        vat = $5, balsheet = $6, form_760 = $7, irap = $8, isa = $9, pf_740 = $10, acct = $11, is_done = $12
       WHERE id = $13`,
      [
        company.lipeQ1 ? 1 : 0,
        company.lipeQ2 ? 1 : 0,
        company.lipeQ3 ? 1 : 0,
        company.lipeQ4 ? 1 : 0,
        company.vat ? 1 : 0,
        company.balsheet ? 1 : 0,
        company.form760 ? 1 : 0,
        company.irap ? 1 : 0,
        company.isa ? 1 : 0,
        company.pf740 ? 1 : 0,
        company.acct ? 1 : 0,
        company.isDone ? 1 : 0,
        company.id,
      ],
    );
  },
};
