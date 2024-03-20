const formData = {
    Explore: {
        Id: "20ad60f6-51c1-ec11-811e-0050560111da",
        QuestionnnaireSubmitted: null,
        Adopted: null,
        SpentThreeYearsInUk: null,
        HighestTertiaryQualification: null,
        WorkStatus: null,
        Experience: null,
        InPersonOrRemote: null,
        SalaryAndBonus: null,
        PrimaryObjective: null,
        HavePartner: null,
        HaveChildren: null,
    },
    HavePartner: true,
    HaveChildren: false,
    PrimaryApplicant: {
        Id: "a161b1bb-72a9-dd11-a616-001f2965fc1c",
        PreferredTitle: null,
        FirstName: null,
        LastName: null,
        DateOfBirth: null,
        Gender: null,
        MaritalStatus: null,
        Country: null,
        AddressLine1: "123 Fake Street",
        AddressLine2: "Elssholzstrasse",
        City: "Cape Town",
        State: null,
        PostalCode: "0001",
        PreferredContactMethod: 2,
        MobilePhone: "0795249933",
        HomeNumber: "27217123527",
        WorkNumber: "01155555222",
        EmailHome: "home@1stcontact.com",
        EmailWork: "leanne.shrosbree@sableinternational.com",
        PassportCountry: null,
        PassportNumber: null,
        AdditionalPassports: [
            {
                PassportCountry: "4703",
            },
            {
                PassportCountry: "2328",
            },
        ],
        CountryOfBirth: null,
        Adopted: null,
        SpentThreeYearsInUk: null,
        Ancestry: null,
        HighestTertiaryQualification: null,
        AdditionalQualifications: null,
        AdditionalLanguages: null,
        WorkStatus: null,
        JobTitle: null,
        Experience: null,
        InPersonOrRemote: null,
        Holding: null,
        SalaryAndBonus: null,
        AdditionalIncome: null,
        Assets: null,
        Budget: null,
    },
    Partner: {
        Id: "88d7f94b-dee4-ed11-a411-005056011ae9",
        _Delete_: null,
        StateCode: 0,
        DependentType: null,
        PreferredTitle: null,
        FirstName: null,
        LastName: null,
        DateOfBirth: null,
        Gender: null,
        MaritalStatus: null,
        DateOfMarriage: null,
        PreferredContactMethod: 100000000,
        MobilePhone: null,
        HomeNumber: null,
        WorkNumber: null,
        EmailHome: null,
        EmailWork: null,
        PassportCountry: null,
        PassportNumber: null,
        AdditionalPassports: null,
        CountryOfBirth: null,
        Adopted: null,
        SpentThreeYearsInUk: null,
        Ancestry: null,
        HighestTertiaryQualification: null,
        AdditionalQualifications: null,
        AdditionalLanguages: null,
        WorkStatus: null,
        JobTitle: null,
        Experience: null,
        InPersonOrRemote: null,
        Holding: null,
        SalaryAndBonus: null,
        AdditionalIncome: null,
        Assets: null,
    },
    Dependents: null,
    TimeZone: null,
};

type TAnyKey = Record<string, string>;

interface IOperationConfig {
    entity: string;
    action: "create" | "read" | "update" | "delete" | "upsert";
    enumerationType?: "single" | "array"; // default is single?!
    basePath?: string;
    primaryKeyIdentifier?: string
    mapping: TAnyKey;
}

/*
        PreferredTitle: null,
        FirstName: null,
        LastName: null,

Map this how you would want it mapped out.
Dont think of logic.
Just imagine it being done working and perfect! (Good feeling here)

!! dont be perfect, just quick and dirty!

*/



const operations: IOperationConfig[] = [
    {
        entity: "new_explore",
        action: "update",
        enumerationType: "single",
        primaryKeyIdentifier: "$exploreId",
        mapping: {
            $id: "$.Explore.Id",
            new_children: "$.HaveChildren",
            new_partner: "$.HavePartner"
        }
    },
    {
        entity: "contact",
        action: "update",
        enumerationType: "single",
        primaryKeyIdentifier: "$contactId",
        mapping: {
            $id: "$.PrimaryApplicant.Id",
            new_title: "$.PrimaryApplicant.PreferredTitle",
            firstname: "$.PrimaryApplicant.FirstName",
            lastname: "$.PrimaryApplicant.LastName",
            new_gender: "$.PrimaryApplicant.Gender",
            new_maritalstatus: "$.PrimaryApplicant.MaritalStatus"
        },
    },
    {
        entity: "new_additionalnationality",
        action: "upsert",
        enumerationType: "array",
        basePath: "$.PrimaryApplicant.AdditionalPassports",
        mapping: {
            $id: "$.PrimaryApplicant.AdditionalPassports",
            new_clientid: "$contactId",
            new_exploreid: "$contactId",
            new_passport: "$.PassportCountry",
        }
    }
];

// perfect world (H)

// loop thru every item in the array
// for each item...
//// build the entity to be updated via odata...
//// automatically cast/convert fields to correct data types
//// complain if you are trying to perform INSERT when a ID is specified


const _odata = {
    create: (obj: any) => { },
    update: (obj: any) => { }
}

const map = new Map();

for (const operation of operations) {

    // create object of given 'entity'
    // { "new_explore": {} }
    // const obj = { "a": {} }

    // collect values
    //for (let map in op.mapping) {
    //    console.log(key, yourobject[key]);
    //}

    for (const [key, path] of Object.entries(operation.mapping)) {

        // get json value
        // value = $jpath(data, path)

        // assign entity attribute value
        // obj[key] = value;
    }

    // perform operation
    // how do we know which operation to perform


    if (operation.action === "create") {
        const id = _odata.create(obj);
        map.set(operation.primaryKeyIdentifier, id);
    }
    if (operation.action === "update") {
        _odata.update(obj);
    }



}



/*

AdditionalPassports
new_passport

explore form already had a client and explore record associated with each other.
so when you save an explore form it just update the client and new_explore.

only new_additionalnationality get inserted

*/
