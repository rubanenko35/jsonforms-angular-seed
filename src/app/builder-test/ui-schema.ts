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
