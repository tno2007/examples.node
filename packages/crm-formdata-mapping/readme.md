## Form Data

```json
{
  "HaveChildren": false,
  "HavePartner": true,
  "Explore": {
    "Id": "20ad60f6-51c1-ec11-811e-0050560111da"
  },
  "PrimaryApplicant": {
    "Id": "a161b1bb-72a9-dd11-a616-001f2965fc1c",
    "PassportCountry": 803,
    "AdditionalPassports": [
      {
        "PassportCountry": "4703"
      },
      {
        "PassportCountry": "2328"
      }
    ]
  },
  "Partner": {
    "Id": "88d7f94b-dee4-ed11-a411-005056011ae9",
    "PassportCountry": 1328,
    "AdditionalPassports": []
  }
}
```

## Config

```json
    {
        "operation": "create",
        "entity": "contact",
        "enumerationType": "single",
        "mapping": {
            "new_title": "$.PrimaryApplicant.PreferredTitle",
            "firstname": "$.PrimaryApplicant.FirstName",
            "lastname": "$.PrimaryApplicant.LastName"
        },
    },
```

### contact metadata

```
http://sab-crmdev01:5555/SableDEV/api/data/v9.1/EntityDefinitions(LogicalName=%27contact%27)?%24select=MetadataId,LogicalName,%20SchemaName,%20CollectionSchemaName,PrimaryIdAttribute&%24expand=Attributes(%24select%3DMetadataId,AttributeType,LogicalName,SchemaName),ManyToOneRelationships(%24select%3DReferencingAttribute,ReferencedEntity)
```
