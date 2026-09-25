use tauri_plugin_sql::{Builder, Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // 1. Define the SQL commands to create your tables
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
                CREATE TABLE IF NOT EXISTS clients (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    tax_code TEXT,
                    email TEXT,
                    phone TEXT,
                    rea_number TEXT,
                    address_of_residence TEXT,
                    domicile_address TEXT,
                    pec_email TEXT,
                    pec_password TEXT,
                    spid_username TEXT,
                    spid_password TEXT,
                    spid_operator TEXT,
                    tin_number TEXT,
                    tax_agency_pincode TEXT,
                    tax_agency_password TEXT,
                    activity_code TEXT,
                    ongoing_project TEXT,
                    project_status TEXT,
                    payment_status TEXT,
                    admin_notes TEXT
                );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_companies_table",
            sql: "
                CREATE TABLE IF NOT EXISTS companies (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    vat_number TEXT,
                    tax_id TEXT,
                    registered_office TEXT,
                    pec_email TEXT,
                    pec_password TEXT,
                    legal_rep_name TEXT,
                    legal_rep_surname TEXT,
                    legal_rep_dob TEXT,
                    legal_rep_place_of_birth TEXT,
                    fisconeline_pin TEXT,
                    inps_registration_no TEXT,
                    date_of_constitution TEXT,
                    licence_number TEXT
                );
            ",
            kind: MigrationKind::Up,
        },
        // ... Keep version 1 and 2 ...
        Migration {
            version: 3,
            description: "add_tax_worksheets",
            sql: "
                ALTER TABLE clients ADD COLUMN lipe_q1 INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN lipe_q2 INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN lipe_q3 INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN lipe_q4 INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN vat INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN pf_740 INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN isa INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN acct INTEGER DEFAULT 0;
                ALTER TABLE clients ADD COLUMN is_done INTEGER DEFAULT 0;

                ALTER TABLE companies ADD COLUMN lipe_q1 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN lipe_q2 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN lipe_q3 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN lipe_q4 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN vat INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN balsheet INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN form_760 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN irap INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN isa INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN pf_740 INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN acct INTEGER DEFAULT 0;
                ALTER TABLE companies ADD COLUMN is_done INTEGER DEFAULT 0;
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "add_document_paths",
            sql: "
                ALTER TABLE clients ADD COLUMN identity_card_path TEXT;
                ALTER TABLE clients ADD COLUMN residence_permit_path TEXT;
                ALTER TABLE clients ADD COLUMN passport_path TEXT;
                ALTER TABLE clients ADD COLUMN sanitary_card_path TEXT;
            ",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        // 2. Register the SQL plugin with your migrations
        .plugin(
            Builder::default()
                .add_migrations("sqlite:crm.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
