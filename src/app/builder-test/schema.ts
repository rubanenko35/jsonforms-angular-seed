import { JsonSchema } from '@jsonforms/core';

export const ACCOUNT_SCHEMA = {
  "title": "User account",
  "type": "object",
  "properties": {
    "accountType": {
      "type": "string",
      "default": "personal",
      "enum": ["personal", "business"]
    },
    "age": {
      "type": "integer",
      "minimum": 0
    },
    "companyName": {
      "type": "string"
    }
  },
  "required": ["accountType"],
  "allOf": [
    {
      "if": {
        "properties": { "accountType": { "const": "personal" } }
      },
      "then": {
        "required": ["age"],
        "properties": {
          "age": { "minimum": 18 },
          "companyName": { "type": "null" }
        }
      },
      "else": {
        "required": ["companyName"]
      }
    }
  ]
}

export const ALL_TYPES_SCHEMA: JsonSchema = {
  "title": "StarsEnterprise.Examples.ExampleCustomViewAllTypesReferencesUpdated",
  "type": "object",
  "description": "This is an example result type used for development",
  "additionalItems": false,
  "required": [
    "SimpleString",
    "Byte",
    "PositiveNumber"
  ],
  "properties": {
    "SimpleBool": {
      "type": "boolean",
      "description": "This is a simple boolean property"
    },
    "SimpleInteger": {
      "type": "number",
      "description": "This is a simple integer property",
    },
    "SimpleString": {
      "type": "string",
      "description": "This is a simple string property",
    },
    "SimpleNumber": {
      "type": "number",
      "description": "This is a simple number property",
    },
    "NumberWithUnit": {
      "type": "number",
      "description": "This is a number with unit property"
    },
    "DeletedNumber": {
      "type": "number",
      "description": "This property should not be displayed in the UI",
    },
    "ReadonlyNumber": {
      "type": "number",
      "description": "This number can not be changed"
    },
    "SimpleDateTime": {
      "type": "string",
      "description": "This is a simple date/time property",
      "format": "date-time",
    },
    "SimpleDate": {
      "type": "string",
      "description": "This is a simple date property"
    },
    "SimpleTime": {
      "type": "number",
      "description": "This is a simple time property"
    },
    "SimpleTimeSpan": {
      "type": "number"
    },
    "TimeSpanWithLimits": {
      "type": "number",
      "description": "This time span can be between 0 and 1 day",
      "maximum": 86400.0,
      "minimum": 0.0
    },
    "Byte": {
      "type": "number",
      "description": "This number can be only between 0 and 255",
      "maximum": 255.0,
      "minimum": 0.0
    },
    "StringWithOnlyLetters": {
      "type": "string",
      "description": "This string can only contain letters",
      "pattern": "^[A-Za-z]+$"
    },
    "PositiveNumber": {
      "type": "number",
      "description": "This number must be greater than 0",
      "minimum": 0.0
    },
    "State": {
      "type": "object",
      "description": "The state of the test",
      "properties": {
        "Name": {
          "type": "string",
          "enum": [
            "New",
            "Running",
            "Finished",
            "Aborted"
          ]
        }
      }
    },
    "SimpleReferenceType": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "ConfiguredReference": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "ConfiguredReference2": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "ConfiguredComplexReference": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "MissingReferenceType": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "NotExistingReferenceType": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "ModifiedAtDate": {
      "type": "string",
      "description": "The date of modifying staff member's personnel file"
    },
    "ConfiguredComplexReferenceWithoutAndOr": {
      "type": "object",
      "description": "This is an example reference",
      "properties": {
        "Name": {
          "type": "string"
        },
        "Version": {
          "type": "integer"
        }
      }
    },
    "MissingReferenceTypeTEsssss": {
      "type": "object",
      "description": "This is an example reference",
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


export const REPORT_SCHEMA = {
  "title": "StarsEnterprise.Reports.Report",
  "type": "object",
  "description": "The report definition.",
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
    "Description": {
      "type": "string",
      "description": "A detailed description of the report purpose."
    },
    "ReportType": {
      "type": "object",
      "description": "Specify either a single or multi report type.",
      "properties": {
        "Name": {
          "type": "string",
          "enum": [
            "Single",
            "Multi"
          ]
        }
      }
    },
    "ResolveResourceReferenceFrom": {
      "type": "object",
      "description": "Define how to resolve resource reference properties in the resource you're reporting on.",
      "properties": {
        "Name": {
          "type": "string",
          "enum": [
            "StoredVersion",
            "CurrentVersion",
            "LatestVersion"
          ]
        }
      }
    },
    "TimeZone": {
      "type": "string",
      "description": "The name of the time zone to convert DateTime values in the report to. Example: 'Europe/London'."
    },
    "ResourceTypes": {
      "type": "array",
      "description": "Select the resource types whose resources you want to report on.",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "GridIntegration": {
      "type": "object",
      "properties": {
        "PriorityIndex": {
          "type": "number",
          "description": "Specify where the report button appears on the toolbar. Buttons are displayed from left to right in ascending numerical order"
        },
        "ToolbarIconSource": {
          "type": "string",
          "description": "Source for the icon to show on the toolbar button. Can be a link to an attachment or a Base64-encoded image."
        },
        "ContextMenuIconSource": {
          "type": "string",
          "description": "Source for the icon to show on the overflow menu button. Can be a link to an attachment or a Base64-encoded image."
        },
        "Text": {
          "type": "string",
          "description": "Label for button"
        },
        "Tooltip": {
          "type": "string",
          "description": "Tooltip for button"
        },
        "Action": {
          "type": "object",
          "description": "The action to perform on the report. If not specified, the default action is Generate",
          "properties": {
            "Name": {
              "type": "string",
              "enum": [
                "Generate",
                "Convert"
              ]
            }
          }
        },
        "RunAsJob": {
          "type": "boolean",
          "description": "Create the report as a job to avoid timeout for large reports.",
          "x-deprecated": true
        },
        "PreviewDisplayFormat": {
          "type": "object",
          "description": "Specify the default format for the report preview. If not specified, the default is PDF.",
          "properties": {
            "Name": {
              "type": "string",
              "enum": [
                "Pdf",
                "Html"
              ]
            }
          }
        },
        "DefaultGridAction": {
          "type": "boolean",
          "description": "If true, double-clicking a resource in the grid opens the report and not the resource editor."
        },
        "Template": {
          "type": "object",
          "properties": {
            "AttachmentLocation": {
              "type": "object",
              "properties": {
                "Name": {
                  "type": "string",
                  "enum": [
                    "ConfigurationResource",
                    "SubjectResource"
                  ]
                }
              }
            },
            "AttachmentName": {
              "type": "string",
              "description": "The name of the attached template including file extension. Accepts wildcards."
            }
          }
        },
        "ReportDownload": {
          "type": "object",
          "properties": {
            "Excel": {
              "type": "boolean",
              "description": "Specify whether to make an Excel download button available."
            },
            "Pdf": {
              "type": "boolean",
              "description": "Specify whether to make a PDF file download button available."
            },
            "Csv": {
              "type": "boolean",
              "description": "Specify whether to make a CSV file download button available."
            }
          }
        },
        "AttachOutput": {
          "type": "object",
          "properties": {
            "RunAsJob": {
              "type": "boolean",
              "description": "The report will be created in a job to avoid time-out for large, complex reports."
            },
            "OutputAs": {
              "type": "object",
              "description": "The output action to perform after the report is created. If not specified, the default output type is Download.",
              "properties": {
                "Name": {
                  "type": "string",
                  "enum": [
                    "Download",
                    "AttachToSubjectResource",
                    "AttachToAnotherResource"
                  ]
                }
              }
            },
            "TypeName": {
              "type": "string",
              "description": "The name of the type to attach the generated report to"
            },
            "InstanceName": {
              "type": "string",
              "description": "The name of the instance to attach the generated report to. If not specified, the user can select."
            }
          }
        },
        "DynamicDesign": {
          "type": "boolean",
          "description": "If true then report uses the dynamic design feature."
        }
      }
    }
  }
}
