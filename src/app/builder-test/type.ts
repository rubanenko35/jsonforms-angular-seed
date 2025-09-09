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

export const REPORT_TYPE = {
  "Source": "StarsEnterprise",
  "AllowedOperations": "CreateInstance,DeleteType,DeleteTypePermanently,MakeTypeGlobal,ReadType,ReadTypeMetadata,UpdatePermissions,UpdateTenants,UpdateType",
  "Name": "StarsEnterprise.Reports.Report",
  "DisplayName": "Reports/Report",
  "Description": "The report definition.",
  "TypeDeclarations": [
    {
      "Name": "ReportDownloads",
      "Properties": [
        {
          "Type": "Boolean",
          "Name": "Excel",
          "DisplayName": "Excel",
          "Description": "Specify whether to make an Excel download button available."
        },
        {
          "Type": "Boolean",
          "Name": "Pdf",
          "DisplayName": "PDF",
          "Description": "Specify whether to make a PDF file download button available."
        },
        {
          "Type": "Boolean",
          "Name": "Csv",
          "DisplayName": "CSV",
          "Description": "Specify whether to make a CSV file download button available."
        }
      ]
    },
    {
      "Name": "Template",
      "Properties": [
        {
          "EnumDeclaration": "AttachmentLocations",
          "DefaultValue": {
            "Name": "ConfigurationResource"
          },
          "Type": "Enum",
          "Name": "AttachmentLocation",
          "DisplayName": "Location of attached template"
        },
        {
          "Type": "String",
          "Name": "AttachmentName",
          "DisplayName": "Name of attached template",
          "Description": "The name of the attached template including file extension. Accepts wildcards."
        }
      ]
    },
    {
      "Name": "AttachReport",
      "Properties": [
        {
          "Type": "Boolean",
          "Name": "RunAsJob",
          "DisplayName": "Run as job",
          "Description": "The report will be created in a job to avoid time-out for large, complex reports."
        },
        {
          "EnumDeclaration": "OutputAs",
          "DefaultValue": {
            "Name": "Download"
          },
          "Type": "Enum",
          "Name": "OutputAs",
          "DisplayName": "Output as",
          "Description": "The output action to perform after the report is created. If not specified, the default output type is Download."
        },
        {
          "Type": "String",
          "Name": "TypeName",
          "DisplayName": "Attach to type",
          "Description": "The name of the type to attach the generated report to"
        },
        {
          "Type": "String",
          "Name": "InstanceName",
          "DisplayName": "Attach to instance",
          "Description": "The name of the instance to attach the generated report to. If not specified, the user can select."
        }
      ]
    },
    {
      "Name": "GridIntegration",
      "Properties": [
        {
          "Type": "Integer",
          "Name": "PriorityIndex",
          "DisplayName": "Toolbar position index",
          "Description": "Specify where the report button appears on the toolbar. Buttons are displayed from left to right in ascending numerical order"
        },
        {
          "Type": "String",
          "Name": "ToolbarIconSource",
          "DisplayName": "Toolbar button icon",
          "Description": "Source for the icon to show on the toolbar button. Can be a link to an attachment or a Base64-encoded image."
        },
        {
          "Type": "String",
          "Name": "ContextMenuIconSource",
          "DisplayName": "Overflow menu button icon",
          "Description": "Source for the icon to show on the overflow menu button. Can be a link to an attachment or a Base64-encoded image."
        },
        {
          "Type": "String",
          "Name": "Text",
          "DisplayName": "Label",
          "Description": "Label for button"
        },
        {
          "Type": "String",
          "Name": "Tooltip",
          "DisplayName": "Tooltip",
          "Description": "Tooltip for button"
        },
        {
          "EnumDeclaration": "Actions",
          "DefaultValue": {
            "Name": "Generate"
          },
          "Type": "Enum",
          "Name": "Action",
          "DisplayName": "Action",
          "Description": "The action to perform on the report. If not specified, the default action is Generate"
        },
        {
          "Type": "Boolean",
          "Name": "RunAsJob",
          "DisplayName": "Run as job",
          "Description": "Create the report as a job to avoid timeout for large reports.",
          "IsDeleted": true
        },
        {
          "EnumDeclaration": "DisplayFormats",
          "DefaultValue": {
            "Name": "Pdf"
          },
          "Type": "Enum",
          "Name": "PreviewDisplayFormat",
          "DisplayName": "Preview display format",
          "Description": "Specify the default format for the report preview. If not specified, the default is PDF."
        },
        {
          "Type": "Boolean",
          "Name": "DefaultGridAction",
          "DisplayName": "Default grid action",
          "Description": "If true, double-clicking a resource in the grid opens the report and not the resource editor."
        },
        {
          "TypeDeclaration": "Template",
          "Type": "Object",
          "Name": "Template",
          "DisplayName": "Template"
        },
        {
          "TypeDeclaration": "ReportDownloads",
          "Type": "Object",
          "Name": "ReportDownload",
          "DisplayName": "Output formats"
        },
        {
          "TypeDeclaration": "AttachReport",
          "Type": "Object",
          "Name": "AttachOutput",
          "DisplayName": "Attach output"
        },
        {
          "Type": "Boolean",
          "Name": "DynamicDesign",
          "DisplayName": "Enable dynamic design",
          "Description": "If true then report uses the dynamic design feature."
        }
      ]
    }
  ],
  "EnumDeclarations": [
    {
      "Name": "ReportTypes",
      "DisplayName": "Report type",
      "Description": "Specify either a single or multi report type.",
      "Enumerators": [
        {
          "Name": "Single",
          "Value": 1,
          "DisplayName": "Single",
          "Description": "Create a sheet for each matching resource in the report query. If there are multiple sheets, the report files are delivered as a single zip file."
        },
        {
          "Name": "Multi",
          "Value": 2,
          "DisplayName": "Multi",
          "Description": "Create a single sheet with a row for each resource."
        }
      ]
    },
    {
      "Name": "ResolveResourceReferenceFrom",
      "DisplayName": "Resolve resource references from",
      "Description": "Define how to resolve resource reference properties in the resource you're reporting on.",
      "Enumerators": [
        {
          "Name": "StoredVersion",
          "Value": 0,
          "DisplayName": "Stored version",
          "Description": "Report shows the version of the resource which was current when the reference was created."
        },
        {
          "Name": "CurrentVersion",
          "Value": 1,
          "DisplayName": "Current version",
          "Description": "Report shows the current published version of the referenced resource instance."
        },
        {
          "Name": "LatestVersion",
          "Value": 2,
          "DisplayName": "Latest version",
          "Description": "Report shows the current published version of the referenced resource, or the draft resource if one exists."
        }
      ]
    },
    {
      "Name": "DisplayFormats",
      "Enumerators": [
        {
          "Name": "Pdf",
          "Value": 0,
          "DisplayName": "PDF",
          "Description": "Displays a PDF with each page formatted as configured in the print settings of the template."
        },
        {
          "Name": "Html",
          "Value": 1,
          "DisplayName": "HTML",
          "Description": "Displays a single HTML page with a scrollable view of all report sheets."
        }
      ]
    },
    {
      "Name": "Actions",
      "Enumerators": [
        {
          "Name": "Generate",
          "Value": 0,
          "DisplayName": "Generate",
          "Description": "Generate the report from a template and convert it to the specified format."
        },
        {
          "Name": "Convert",
          "Value": 1,
          "DisplayName": "Convert",
          "Description": "Convert a pre-generated report to the specified format."
        }
      ]
    },
    {
      "Name": "OutputAs",
      "Enumerators": [
        {
          "Name": "Download",
          "Value": 0,
          "DisplayName": "Download",
          "Description": "When finished, download the report."
        },
        {
          "Name": "AttachToSubjectResource",
          "Value": 1,
          "DisplayName": "Attach to subject resource",
          "Description": "When finished, attach the report to the resource the report was created about."
        },
        {
          "Name": "AttachToAnotherResource",
          "Value": 2,
          "DisplayName": "Attach to another resource",
          "Description": "When finished, attach the report to the resource defined by type and/or instance name."
        }
      ]
    },
    {
      "Name": "AttachmentLocations",
      "Enumerators": [
        {
          "Name": "ConfigurationResource",
          "Value": 0,
          "DisplayName": "This resource",
          "Description": "The attachment is attached to this report configuration resource."
        },
        {
          "Name": "SubjectResource",
          "Value": 1,
          "DisplayName": "Subject resource",
          "Description": "The attachment is attached to the resource being reported on."
        }
      ]
    }
  ],
  "Permissions": [
    {
      "Operation": "ReadType",
      "Role": "*"
    },
    {
      "Operation": "ReadInstance",
      "Role": "*"
    },
    {
      "Operation": "ReadUnpublishedInstance",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "CreateInstance",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "UpdateType",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "UpdateInstance",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "UpdateAttachments",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "PublishInstance",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "DeleteType",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "DeleteInstance",
      "Role": "Reports.Administrator"
    },
    {
      "Operation": "UpdateProperty",
      "Role": "Reports.Administrator"
    }
  ],
  "Tenants": [],
  "Properties": [
    {
      "Type": "String",
      "Name": "Description",
      "DisplayName": "Report description",
      "Description": "A detailed description of the report purpose.",
      "IsDeleted": false
    },
    {
      "EnumDeclaration": "ReportTypes",
      "Type": "Enum",
      "Name": "ReportType",
      "DisplayName": "Report type",
      "Description": "Specify either a single or multi report type.",
      "IsRequired": false,
      "IsDeleted": false
    },
    {
      "EnumDeclaration": "ResolveResourceReferenceFrom",
      "Type": "Enum",
      "Name": "ResolveResourceReferenceFrom",
      "DisplayName": "Resolve resource references from",
      "Description": "Define how to resolve resource reference properties in the resource you're reporting on.",
      "IsRequired": false,
      "IsDeleted": false
    },
    {
      "Type": "String",
      "Name": "TimeZone",
      "DisplayName": "Time zone",
      "Description": "The name of the time zone to convert DateTime values in the report to. Example: 'Europe/London'.",
      "IsRequired": false,
      "IsDeleted": false
    },
    {
      "ElementTypes": [
        {
          "Type": "String"
        }
      ],
      "Type": "Array",
      "Name": "ResourceTypes",
      "DisplayName": "Resource types",
      "Description": "Select the resource types whose resources you want to report on.",
      "IsDeleted": false
    },
    {
      "TypeDeclaration": "GridIntegration",
      "Type": "Object",
      "Name": "GridIntegration",
      "DisplayName": "Grid integration",
      "IsDeleted": false
    }
  ]
}
