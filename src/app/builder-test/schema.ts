export const RESOURCE_SCHEMA = {
  // "$schema": "http://json-schema.org/draft-04/schema#",
  // "id": "http://development-enterprise.hta.cloud/data/v1/service/api/types/StarsEnterprise.GasBottles.Bottle/code/JsonSchema?generateMetadata=true",
  "title": "StarsEnterprise.GasBottles.Bottle",
  "type": "object",
  "description": "This resource type describes a gas bottle",
  "additionalItems": false,
  "properties": {
    "Name": {
      "type": "string",
      "description": "The name of the resource."
    },
    "DisplayName": {
      "type": "string",
      "description": "The display name of the resource."
    },
    "IsDeleted": {
      "type": "boolean",
      "description": "If this value is true this resource was archived."
    },
    "Owner": {
      "type": "string",
      "description": "The owner of the resource."
    },
    "Labels": {
      "type": "array",
      "description": "A list of labels of this resource.",
      "items": [
        {
          "type": "object",
          "required": [
            "Name",
            "Value"
          ],
          "properties": {
            "Name": {
              "type": "string",
              "readonly": true,
              "description": "The name of the label."
            },
            "Value": {
              "type": "string",
              "readonly": true,
              "description": "The value of the label."
            }
          }
        }
      ]
    },
    "Permissions": {
      "type": "array",
      "description": "The list of the permissions for this resource instance.",
      "items": [
        {
          "type": "object",
          "required": [
            "Role",
            "Operation"
          ],
          "properties": {
            "Role": {
              "type": "string",
              "readonly": true,
              "description": "The role of the permission."
            },
            "Operation": {
              "type": "string",
              "readonly": true,
              "description": "The operation of the permission."
            },
            "Properties": {
              "type": "array",
              "description": "The properties of the permission.",
              "items": [
                {
                  "type": "string"
                }
              ]
            },
            "Users": {
              "type": "array",
              "description": "The Users of the permission.",
              "items": [
                {
                  "type": "string"
                }
              ]
            }
          }
        }
      ]
    },
    "Tenants": {
      "type": "array",
      "description": "The tenants this instance belongs to.",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "Active": {
      "type": "boolean",
      "description": "Available"
    },
    "GasRoom": {
      "type": "object",
      "description": "Gas room",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "Gas": {
      "type": "object",
      "description": "Gas 1",
      "properties": {
        "Label": {
          "type": "string",
          "description": "Label"
        },
        "GasType": {
          "type": "object",
          "description": "Type",
          "properties": {
            "Name": {
              "type": "string"
            },
            "Version": {
              "type": "integer"
            }
          }
        },
        "Concentration": {
          "type": "number",
          "description": "Concentration"
        }
      }
    },
    "ManufacturerID": {
      "type": "string"
    },
    "SerialNo": {
      "type": "string"
    },
    "AnalysisDate": {
      "type": "string",
      "description": "Analysis date"
    },
    "ExpiryDate": {
      "type": "string",
      "description": "Expiry date"
    },
    "Remark": {
      "type": "string"
    },
    "CarrierGas": {
      "type": "object",
      "description": "Carrier gas",
      "properties": {
        "Name": {
          "type": "string",
          "enum": [
            "SyntheticAir",
            "Nitrogen"
          ]
        }
      }
    },
    "Gas2": {
      "type": "object",
      "description": "Gas 2",
      "properties": {
        "Label": {
          "type": "string",
          "description": "Label"
        },
        "GasType": {
          "type": "object",
          "description": "Type",
          "properties": {
            "Name": {
              "type": "string"
            },
            "Version": {
              "type": "integer"
            }
          }
        },
        "Concentration": {
          "type": "number",
          "description": "Concentration"
        }
      }
    },
    "Volume": {
      "type": "number",
      "description": "Volume"
    },
    "FillPressure": {
      "type": "number",
      "description": "Fill pressure"
    },
    "MinPressureUsage": {
      "type": "number",
      "description": "Min pressure usage"
    },
    "Description": {
      "type": "string",
      "description": "Description"
    },
    "HydroCarbonConcentrationExpressedAsPpmC": {
      "type": "boolean",
      "description": "Only applicable for FIDs"
    },
    "AppliedUnitProfile": {
      "type": "object",
      "description": "This is a unit profile reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    }
  }
}
