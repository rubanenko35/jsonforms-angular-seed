export const ALL_TYPES_UI_SCHEMA = {
  "type": "Categorization",
  "elements": [
    {
      "type": "Category",
      "label": "Basic Information",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/SimpleString",
              "label": "Simple String",
              "options": {
                "placeholder": "Enter text",
                "multi": false
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/SimpleNumber",
              "label": "Simple Number",
              "options": {
                "placeholder": "Enter a number"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/SimpleInteger",
              "label": "Simple Integer",
              "options": {
                "placeholder": "Enter integer value"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/SimpleBool",
              "label": "Simple Boolean"
            }
          ]
        }
      ]
    },
    {
      "type": "Category",
      "label": "Time & Dates",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/SimpleDate",
              "label": "Date",
              "options": {
                "format": "date"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/SimpleDateTime",
              "label": "Date & Time",
              "options": {
                "format": "date-time"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/SimpleTime",
              "label": "Time",
              "options": {
                "format": "time"
              }
            }
          ]
        },
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/SimpleTimeSpan",
              "label": "Duration (seconds)",
              "options": {
                "placeholder": "Enter time span in seconds"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/TimeSpanWithLimits",
              "label": "Time Span (0–86400 sec)",
              "options": {
                "slider": true,
                "min": 0,
                "max": 86400
              }
            }
          ]
        }
      ]
    },
    {
      "type": "Category",
      "label": "Numeric Properties",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/Byte",
              "label": "Byte (0–255)",
              "options": {
                "slider": true,
                "min": 0,
                "max": 255
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/NumberWithUnit",
              "label": "Number With Unit",
              "options": {
                "placeholder": "e.g. 12.5"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/PositiveNumber",
              "label": "Positive Number",
              "options": {
                "placeholder": "Greater than 0"
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/ReadonlyNumber",
              "label": "Readonly Number",
              "options": {
                "readonly": true
              }
            }
          ]
        }
      ]
    },
    {
      "type": "Category",
      "label": "String Validation Examples",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/StringWithOnlyLetters",
              "label": "Letters Only",
              "options": {
                "placeholder": "A–Z only"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "Category",
      "label": "References & States",
      "elements": [
        {
          "type": "Group",
          "label": "State",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/State/properties/Name",
              "label": "State Name",
              "options": {
                "format": "select"
              }
            }
          ]
        },
        {
          "type": "Group",
          "label": "References",
          "elements": [
            {
              "type": "Group",
              "label": "Simple Reference",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/SimpleReferenceType/properties/Name",
                  "label": "Name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/SimpleReferenceType/properties/Version",
                  "label": "Version"
                }
              ]
            },
            {
              "type": "Group",
              "label": "Configured References",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredReference/properties/Name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredReference/properties/Version"
                },
              ]
            },
            {
              "type": "Group",
              "label": "Configured References 2",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredReference2/properties/Name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredReference2/properties/Version"
                },
              ]
            },
            {
              "type": "Group",
              "label": "Configured Complex Reference",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredComplexReference/properties/Name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/ConfiguredComplexReference/properties/Version"
                }
              ]
            },
          ]
        }
      ]
    },
    {
      "type": "Category",
      "label": "Metadata",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/ModifiedAtDate",
          "label": "Modified At",
          "options": {
            "format": "date"
          }
        }
      ]
    }
  ]
};


export const UI_SCHEMA = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/Active",
      "label": "Available",
      "options": {
        "description": "Available"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/GasRoom",
      "label": "Gas room",
      "options": {
        "description": "Gas room"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/CarrierGas",
      "label": "Carrier gas",
      "options": {
        "description": "Carrier gas"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Gas",
      "label": "Gas 1",
      "options": {
        "description": "Gas 1"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Gas2",
      "label": "Gas 2",
      "options": {
        "description": "Gas 2"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/HydroCarbonConcentrationExpressedAsPpmC",
      "label": "Hydrocarbon concentration expressed as ppmC",
      "options": {
        "description": "Only applicable for FIDs"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/AnalysisDate",
      "label": "Analysis date",
      "options": {
        "description": "Analysis date",
        "format": "date"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/ExpiryDate",
      "label": "Expiry date",
      "options": {
        "description": "Expiry date",
        "format": "date"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Volume",
      "label": "Volume",
      "options": {
        "description": "Volume",
        "unit": "l"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/FillPressure",
      "label": "Fill pressure",
      "options": {
        "description": "Fill pressure",
        "unit": "bar"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/MinPressureUsage",
      "label": "Min pressure usage",
      "options": {
        "description": "Min pressure usage",
        "unit": "bar"
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Description",
      "label": "Description",
      "options": {
        "description": "Description",
        "multi": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Name",
      "label": "The name of the resource.",
      "options": {
        "description": "The name of the resource."
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/DisplayName",
      "label": "The display name of the resource.",
      "options": {
        "description": "The display name of the resource."
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/IsDeleted",
      "label": "If this value is true this resource was archived.",
      "options": {
        "description": "If this value is true this resource was archived."
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Owner",
      "label": "The owner of the resource.",
      "options": {
        "description": "The owner of the resource."
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Labels",
      "label": "A list of labels of this resource.",
      "options": {
        "description": "A list of labels of this resource.",
        "showSortButtons": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Permissions",
      "label": "The list of the permissions for this resource instance.",
      "options": {
        "description": "The list of the permissions for this resource instance.",
        "showSortButtons": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/Tenants",
      "label": "The tenants this instance belongs to.",
      "options": {
        "description": "The tenants this instance belongs to.",
        "showSortButtons": true
      }
    },
    {
      "type": "Control",
      "scope": "#/properties/ManufacturerID",
      "label": "ManufacturerID"
    },
    {
      "type": "Control",
      "scope": "#/properties/SerialNo",
      "label": "SerialNo"
    },
    {
      "type": "Control",
      "scope": "#/properties/Remark",
      "label": "Remark"
    },
    {
      "type": "Control",
      "scope": "#/properties/AppliedUnitProfile",
      "label": "This is a unit profile reference",
      "options": {
        "description": "This is a unit profile reference"
      }
    }
  ]
}
