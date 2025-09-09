export const RESOURCE_TYPE = {
  "Source": "StarsEnterprise",
  "AllowedOperations": "CreateInstance,DeleteType,DeleteTypePermanently,MakeTypeGlobal,ReadType,ReadTypeMetadata,UpdatePermissions,UpdateTenants,UpdateType",
  "Name": "StarsEnterprise.GasBottles.Bottle",
  "DisplayName": "Bottles",
  "Description": "This resource type describes a gas bottle",
  "TypeDeclarations": [
    {
      "Name": "GasData",
      "Properties": [
        {
          "Type": "String",
          "Name": "Label",
          "DisplayName": "Label",
          "Description": "Label"
        },
        {
          "ResourceType": "StarsEnterprise.GasBottles.GasType",
          "Type": "ResourceReference",
          "Name": "GasType",
          "DisplayName": "Type",
          "Description": "Type"
        },
        {
          "Unit": "ppm",
          "Type": "Number",
          "Name": "Concentration",
          "DisplayName": "Concentration",
          "Description": "Concentration"
        }
      ]
    }
  ],
  "EnumDeclarations": [
    {
      "Name": "CarrierGasTypes",
      "Enumerators": [
        {
          "Name": "SyntheticAir",
          "Value": 1,
          "DisplayName": "Synthetic air"
        },
        {
          "Name": "Nitrogen",
          "Value": 2,
          "DisplayName": "Nitrogen"
        }
      ]
    }
  ],
  "Permissions": [
    {
      "Operation": "ReadType",
      "Role": "GasBottles.Guest"
    },
    {
      "Operation": "ReadInstance",
      "Role": "GasBottles.Guest"
    },
    {
      "Operation": "ReadUnpublishedInstance",
      "Role": "GasBottles.Guest"
    },
    {
      "Operation": "CreateInstance",
      "Role": "GasBottles.Operator"
    },
    {
      "Operation": "UpdateInstance",
      "Role": "GasBottles.Operator"
    },
    {
      "Operation": "UpdateAttachments",
      "Role": "GasBottles.Operator"
    },
    {
      "Operation": "PublishInstance",
      "Role": "GasBottles.Operator"
    },
    {
      "Operation": "DeleteInstance",
      "Role": "GasBottles.Operator"
    }
  ],
  "Tenants": [],
  "Properties": [
    {
      "Type": "Boolean",
      "Name": "Active",
      "DisplayName": "Available",
      "Description": "Available",
      "IsDeleted": false
    },
    {
      "ResourceType": "StarsEnterprise.GasBottles.GasRoom",
      "Type": "ResourceReference",
      "Name": "GasRoom",
      "DisplayName": "Gas room",
      "Description": "Gas room",
      "IsDeleted": false
    },
    {
      "EnumDeclaration": "CarrierGasTypes",
      "Type": "Enum",
      "Name": "CarrierGas",
      "DisplayName": "Carrier gas",
      "Description": "Carrier gas",
      "IsDeleted": false
    },
    {
      "TypeDeclaration": "GasData",
      "Type": "Object",
      "Name": "Gas",
      "DisplayName": "Gas 1",
      "Description": "Gas 1",
      "IsDeleted": false
    },
    {
      "TypeDeclaration": "GasData",
      "Type": "Object",
      "Name": "Gas2",
      "DisplayName": "Gas 2",
      "Description": "Gas 2",
      "IsDeleted": false
    },
    {
      "Type": "Boolean",
      "Name": "HydroCarbonConcentrationExpressedAsPpmC",
      "DisplayName": "Hydrocarbon concentration expressed as ppmC",
      "Description": "Only applicable for FIDs",
      "IsDeleted": false
    },
    {
      "Type": "Date",
      "Name": "AnalysisDate",
      "DisplayName": "Analysis date",
      "Description": "Analysis date",
      "IsDeleted": false
    },
    {
      "Type": "Date",
      "Name": "ExpiryDate",
      "DisplayName": "Expiry date",
      "Description": "Expiry date",
      "IsDeleted": false
    },
    {
      "Unit": "l",
      "Type": "Number",
      "Name": "Volume",
      "DisplayName": "Volume",
      "Description": "Volume",
      "IsDeleted": false
    },
    {
      "Unit": "bar",
      "Type": "Number",
      "Name": "FillPressure",
      "DisplayName": "Fill pressure",
      "Description": "Fill pressure",
      "IsDeleted": false
    },
    {
      "Unit": "bar",
      "Type": "Number",
      "Name": "MinPressureUsage",
      "DisplayName": "Min pressure usage",
      "Description": "Min pressure usage",
      "IsDeleted": false
    },
    {
      "Type": "Text",
      "Name": "Description",
      "DisplayName": "Description",
      "Description": "Description",
      "IsDeleted": false
    }
  ]
}
